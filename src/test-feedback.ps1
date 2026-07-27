$body = @{
    rating = 5
    comment = "Quick and clean pickup"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/pickups/1/feedback" -Method Post -Body $body -ContentType "application/json"