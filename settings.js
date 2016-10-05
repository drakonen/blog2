var settings = {
    mongodb: {
        url: "mongodb://localhost/blog2"
    }
};


if (process.env.NODE_ENV == "test") {
    settings.mongodb.url = "mongodb://localhost/blog2-test"
}

module.exports = settings;
