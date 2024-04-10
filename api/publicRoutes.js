const publicRoutes = (instance, opts, done) => {
    instance.get("/", async (request, reply) => {
        return {
            message:
                "This is a public endpoint. Request /protected to test the Clerk auth middleware",
        };
    });
    done();
};

module.exports = publicRoutes;
