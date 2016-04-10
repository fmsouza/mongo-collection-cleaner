module.exports = {
	databaseConnection: {
		mongodb: {
			user: process.env.RIOBUS_DB_USER || "riobus",
			pass: process.env.RIOBUS_DB_PASS || "riobus",
			dbName: process.env.RIOBUS_DB_NAME || "riobus",
			host: process.env.RIOBUS_DB_HOST || "mongo",
			port: process.env.RIOBUS_DB_PORT || "27017"
		}
	},
	ageLimit: {
		days: 0,
		hours: 4,
		minutes: 0,
		seconds: 0
	}
};