module.exports = {
	databaseConnection: {
		mongodb: {
			user: process.env.RIOBUS_DB_USER || "",
			pass: process.env.RIOBUS_DB_PASS || "",
			dbName: process.env.RIOBUS_DB_NAME || "nodejs",
			host: process.env.RIOBUS_DB_HOST || "localhost",
			port: process.env.RIOBUS_DB_PORT || "27017"
		}
	},
	ageLimit: {
		days: 0,
		hours: 4,
		minutes: 0,
		seconds: 0
	},
    collectionName: process.env.RIOBUS_COLLECTION_NAME || 'bus_history',
    cronPattern: process.env.RIOBUS_CRON_PATTERN || '* * * * * *'
};