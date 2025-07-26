// Inside your Express route
const { spawn } = require("child_process");

app.post("/api/recommend", (req, res) => {
    const resumeText = req.body.resumeText;

    const python = spawn("python", ["ml_model/recommender.py", resumeText]);

    let result = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
        result += data.toString();
    });

    python.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    python.on("close", (code) => {
        if (code !== 0) {
            console.error(`Python exited with code ${code}`);
            console.error(`Error: ${errorOutput}`);
            return res.status(500).json({ error: "Internal server error" });
        }

        try {
            const recommendations = JSON.parse(result);
            res.json({ recommendations });
        } catch (err) {
            console.error("JSON parse error:", err);
            res.status(500).json({ error: "Invalid response from Python script" });
        }
    });

    python.on("error", (err) => {
        console.error("Failed to start Python script:", err);
        res.status(500).json({ error: "Python script execution failed" });
    });
});
