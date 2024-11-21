import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const APIURL = "https://spoo.me"

const config = {
    
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.render("index.ejs")
});

app.post("/submit", async (req, res) => {
    const input = req.body;
    const data = {
        url: input.longUrl,
        alias: input.alias,
    };
    
    try {
        const response = await axios.post( APIURL , data, {
            headers: {
                Accept: "application/json",
                'Content-Type': "application/x-www-form-urlencoded",
            },
        });
        const result = response.data.shortUrl;

        res.render("result.ejs", {
            shortUrl: result,
        });
        
    } catch (error) {
        console.error(error);
        console.log("Error ", error.message)
    }
})


app.listen(port, () => {
 console.log("Server listening on port " + port);
});