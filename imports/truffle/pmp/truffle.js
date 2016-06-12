module.exports = {
  build: "webpack",
  deploy: [
    "Admin",
    "Version",

    "Core",

    "Trading",
    "Registrar",
    "ImageToken",

    "ManagementFee",
    "PerformanceFee",
    "ReferenceType",
  ],
  rpc: {
    host: "localhost",
    port: 8545,
  },
};
