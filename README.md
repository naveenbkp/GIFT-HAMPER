# Gift HAMPER — Hampévia

Hampévia is the product and website brand.

## Structure
- `HampéviaApp/` — Angular frontend.
- `HampéviaManagement/HampéviaApi/` — .NET 8 Web API.
- `HampéviaManagement/Gift HAMPER.sln` — Visual Studio solution.

## Run
1. Open `HampéviaManagement/Gift HAMPER.sln` in Visual Studio and start the API.
2. Run `npm install` and `npm start` inside `HampéviaApp`.
3. Angular calls `https://localhost:7119/api/Hampevia`. Confirm the API is running at this port.

The existing Product entity and database schema remain unchanged to avoid breaking existing data/migrations. Internal C# namespaces use `HampeviaApi` (ASCII) for compatibility.
