export const regionData = [
    { name: "N. Virginia", lat: 38.94, lng: -77.30, id: "us-east-1", color: "#FF9900" },
    { name: "Ohio", lat: 40.36, lng: -82.99, id: "us-east-2", color: "#00A1C9" },
    { name: "N. California", lat: 37.77, lng: -122.41, id: "us-west-1", color: "#FF9900" },
    { name: "Oregon", lat: 44.05, lng: -123.09, id: "us-west-2", color: "#FF9900" },
    { name: "Cape Town", lat: -33.92, lng: 18.42, id: "af-south-1", color: "#3B48CC" },
    { name: "Hong Kong", lat: 22.31, lng: 114.16, id: "ap-east-1", color: "#8C4FFF" },
    { name: "Mumbai", lat: 19.07, lng: 72.87, id: "ap-south-1", color: "#FF0055" },
    { name: "Tokyo", lat: 35.67, lng: 139.65, id: "ap-northeast-1", color: "#FF9900" },
    { name: "Seoul", lat: 37.56, lng: 126.97, id: "ap-northeast-2", color: "#00A1C9" },
    { name: "Singapore", lat: 1.35, lng: 103.81, id: "ap-southeast-1", color: "#3B48CC" },
    { name: "Sydney", lat: -33.86, lng: 151.20, id: "ap-southeast-2", color: "#8C4FFF" },
    { name: "Frankfurt", lat: 50.11, lng: 8.68, id: "eu-central-1", color: "#FF9900" },
    { name: "Ireland", lat: 53.34, lng: -6.26, id: "eu-west-1", color: "#00A1C9" },
    { name: "London", lat: 51.50, lng: -0.12, id: "eu-west-2", color: "#3B48CC" },
    { name: "Paris", lat: 48.85, lng: 2.35, id: "eu-west-3", color: "#8C4FFF" },
    { name: "Stockholm", lat: 59.32, lng: 18.06, id: "eu-north-1", color: "#FF0055" },
    { name: "Sao Paulo", lat: -23.55, lng: -46.63, id: "sa-east-1", color: "#FF9900" }
];

// Generate some "Fiber Optic" links between major hubs
export const fiberLinks = [
    { start: "us-east-1", end: "eu-west-1" }, // Atlantic Cable
    { start: "us-west-1", end: "ap-northeast-1" }, // Pacific Cable
    { start: "eu-central-1", end: "ap-south-1" }, // Europe to India
    { start: "ap-south-1", end: "ap-southeast-1" }, // India to Singapore
    { start: "ap-southeast-1", end: "ap-southeast-2" }, // Singapore to Sydney
    { start: "sa-east-1", end: "us-east-1" }, // Americas
];
