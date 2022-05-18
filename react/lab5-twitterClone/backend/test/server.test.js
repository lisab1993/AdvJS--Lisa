const { expect } = require("chai")
const { connectDatabase } = require("../src/server")

describe("server.js", () => {
    it("Should connect to a mongo db server", async () => {
        const connection = await connectDatabase("test-db")

        expect(connection).to.exist
    })
})