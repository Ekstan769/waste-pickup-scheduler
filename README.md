# BinTime - Waste Pickup Scheduler

A full-stack MVP that lets residents schedule waste pickups, track their status and leave feedback after collection. Built for the 3mtt NextGen capstone (Software Development track, brief SD-14).

## Live Demo
- **Frontend:** https://waste-pickup-scheduler.vercel.app
- **Backend:** https://waste-pickup-scheduler-api.onreader.com

> Note: The backend is hosted on Render's free tier, which spins down after inactivity. The first request after idle time may take 20-30 seconds to respond while the server wakes up.

## Features
- Create a new account and login 
- Schedule a pickup (address + date)
- View all your scheduled pickups
- Mark a pickup as completed
- Leave a rating and commit after a pickup is completed

## Project Structure
waste-pickup-scheduler/
|----client/   -> React frontend
|____src/      -> Express backend