const { Database } = require('./../config/db');
const dbInstance = Database.getInstance();
const sequelize = dbInstance.getSequelizeInstance();

const exportLookerCsv = async (req, res) => {
    try {
        const query = `
            SELECT
                ROW_NUMBER() OVER (ORDER BY instances.instance_id) AS 'No',
                'LEAD' AS 'Program',
                instances.sector AS 'Cluster',
                '' AS 'Tahun Program',
                instances.batch AS 'Batch',
                instances.name AS 'Nama Instansi Lembaga / Organisasi / Komunitas',
                participants.name AS 'Nama Fellows',
                participants.whatsapp_number AS 'Nomor HP',
                participants.email AS 'Alamat Email Fellows',
                '' AS 'Backup Contact Instansi',
                '' AS 'Nomor HP Backup Contact',
                '' AS 'Alamat Email Backup Contact',
                instances.email AS 'Alamat Email Lembaga',
                instances.established_year AS 'Tahun Berdiri/Dibentuknya Instansi',
                CONCAT_WS(
                    ', ',
                    instances.address_street,
                    instances.address_village,
                    instances.address_district,
                    instances.address_regency,
                    instances.address_province,
                    instances.address_postal_code
                ) AS 'Alamat Lengkap Domisili Instansi',
                instances.address_province AS 'Provinsi Domisili Sekertariat Instansi',
                instances.address_regency AS 'Kota/Kabupaten Domisili Sekertariat Instansi',
                provinces.name AS 'Provinsi Jangkauan Wilayah Penerima Manfaat Lembaga',
                cities.name AS 'Kota/Kabupaten Jangkauan Wilayah Penerima Manfaat Lembaga',
                instances.total_beneficiaries AS 'Jumlah Masyarakat yang Terdampak 2022',
                '' AS 'Capaian Pendanaan Online',
                '' AS 'Capaian Pendanaan Offline',
                instances.description AS 'Deskripsi Singkat Instansi',
                '' AS Counter,
                '' AS Jurusan
            FROM
                instances
            LEFT JOIN
                participants ON instances.instance_id = participants.instance_id
            LEFT JOIN
                instance_covered_areas ON instances.instance_id = instance_covered_areas.instance_id
            LEFT JOIN
                cities ON instance_covered_areas.city_id = cities.city_id
            LEFT JOIN
                provinces ON cities.province_id = provinces.province_id
            `;

        const [results] = await sequelize.query(query);

        // Set response headers for CSV download
        res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
        res.setHeader('Content-Type', 'text/csv');

        // Manually write CSV headers based on csvWriter configuration
        const csvHeaders = `No,Program,Cluster,Tahun Program,Batch,Nama Instansi Lembaga / Organisasi / Komunitas,Nama Fellows,Nomor HP,Alamat Email Fellows,Backup Contact Instansi,Nomor HP Backup Contact,Alamat Email Backup Contact,Alamat Email Lembaga,Tahun Berdiri/Dibentuknya Instansi,Alamat Lengkap Domisili Instansi,Provinsi Domisili Sekertariat Instansi,Kota/Kabupaten Domisili Sekertariat Instansi,Provinsi Jangkauan Wilayah Penerima Manfaat Lembaga,Kota/Kabupaten Jangkauan Wilayah Penerima Manfaat Lembaga,Jumlah Masyarakat yang Terdampak 2022,Capaian Pendanaan Online,Capaian Pendanaan Offline,Deskripsi Singkat Instansi,Counter,Jurusan\n`;

        // Manually write records to the response stream based on csvWriter configuration
        results.forEach((result) => {
            // Ensure "Deskripsi Singkat Instansi" is enclosed in double quotes and handle potential commas
            const deskripsiSingkatInstansi = `"${result['Deskripsi Singkat Instansi'].replace(/"/g, '""')}"`;
            const csvRow = `${result.No},"${result.Program}","${result.Cluster}","${result['Tahun Program']}","${result.Batch}","${result['Nama Instansi Lembaga / Organisasi / Komunitas']}","${result['Nama Fellows']}","${result['Nomor HP']}","${result['Alamat Email Fellows']}","${result['Backup Contact Instansi']}","${result['Nomor HP Backup Contact']}","${result['Alamat Email Backup Contact']}","${result['Alamat Email Lembaga']}","${result['Tahun Berdiri/Dibentuknya Instansi']}","${result['Alamat Lengkap Domisili Instansi']}","${result['Provinsi Domisili Sekertariat Instansi']}","${result['Kota/Kabupaten Domisili Sekertariat Instansi']}","${result['Provinsi Jangkauan Wilayah Penerima Manfaat Lembaga']}","${result['Kota/Kabupaten Jangkauan Wilayah Penerima Manfaat Lembaga']}","${result['Jumlah Masyarakat yang Terdampak 2022']}","${result['Capaian Pendanaan Online']}","${result['Capaian Pendanaan Offline']}",${deskripsiSingkatInstansi},"${result.Counter}","${result.Jurusan}"\n`;  // Adjust fields as needed
            res.write(csvRow);
        });

        // End the response stream
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    exportLookerCsv
};
