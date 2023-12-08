# Dashboard Summary Endpoint

## Overview
The `dashboard-summary` endpoint provides a summary of data for the dashboard. It includes information such as types, sectors, established years, areas, covered areas, beneficiaries, total beneficiaries, fund sources, and participant data.

## How to Use
To retrieve the dashboard summary, make a `GET` request to the following endpoint: /api/v1/dashboard-summary


## Input Parameters

### Query Parameters

- **include (optional):** Comma-separated list of data elements to include in the summary. Possible values:
  - "type"
  - "sector"
  - "established_year"
  - "area"
  - "covered_areas"
  - "beneficiaries"
  - "total_beneficiaries"
  - "fund_source"
  - "participant_data"
  - "all" (to include all data elements)

- **status (optional):** Filter instances based on status. Possible values:
  - "all" (default): Include all instances, regardless of status.
  - Specific status value: Filter instances based on the provided status.

### Example Request
```http
GET /api/v1/dashboard-summary?include=type,area,beneficiaries&status=Lolos
```

### Output
#### Success Response (200 OK)
The endpoint responds with a JSON object containing the constructed summary.
```
{
  "status": 200,
  "message": "Berhasil mendapatkan rekapan data dashboard",
  "data": {
    "type": { /* ... */ },
    "sector": { /* ... */ },
    "established_year": { /* ... */ },
    "area": { /* ... */ },
    "covered_areas": { /* ... */ },
    "beneficiaries": { /* ... */ },
    "total_beneficiaries": { /* ... */ },
    "fund_source": { /* ... */ },
    "participant_data": { /* ... */ }
  }
}
```

#### Error Response (500 Internal Server Error)
In case of an error, the endpoint responds with a JSON object containing an error message.

```
{
  "status": 500,
  "message": "Internal Server Error: <error_message>"
}
```

### Example Usage
#### cURL
```cURL
curl -X GET "https://your-api-base-url/api/v1/dashboard-summary?include=type,area,beneficiaries&status=Lolos"
```
```cURL
curl -X GET "https://your-api-base-url/api/v1/dashboard-summary?include=type,area,sector&status=Ditolak"
```
#### JavaScript (Node.js - Axios)
```javascript
const axios = require('axios');

axios.get('https://your-api-base-url/api/v1/dashboard-summary', {
  params: {
    include: 'type,area,beneficiaries',
    status: 'Lolos'
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
```

#### Python (Requests)

```python
import requests

params = {
    'include': 'type,area,beneficiaries',
    'status': 'Lolos'
}

response = requests.get('https://your-api-base-url/api/v1/dashboard-summary', params=params)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}, {response.json()}")
```

#### Postman
1. Open Postman and create a new GET request.
2. Enter the URL: https://your-api-base-url/api/v1/dashboard-summary.
3. Add query parameters in the Params section:
   - Key: include, Value: type,area,beneficiaries
   - Key: status, Value: Lolos
4. Click Send to make the request.
