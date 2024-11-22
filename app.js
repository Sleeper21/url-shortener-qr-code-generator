import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import env from "dotenv";

env.config();
const app = express();
const port = 3000;
const apiUrlShortener = process.env.URL_SHORTENER_API ;
const apiQrCodeGen = process.env.QR_CODE_GENERATOR_API ;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


///////

app.get("/", (req, res) => {
   res.render("index.ejs")
});

app.post("/submit", async (req, res) => {
    const input = req.body;
    const urlShortenerData = {
        url: input.longUrl,
        alias: input.alias,
    };
    
    // Get short Url
    try {
        const response = await axios.post( apiUrlShortener , urlShortenerData, {
            headers: {
                Accept: "application/json",
                'Content-Type': "application/x-www-form-urlencoded",
            },
        });
        const shortUrlResult = response.data.short_url;

            // Get Qr Code from the shortened url
            try {
                const QRcodeResponse = await axios.get( apiQrCodeGen, {
                    params: {
                        data: shortUrlResult,
                        size: "150x150",
                        format: "png",
                    }
                } );
                
                const qrParams = QRcodeResponse.config.params;
                const qrCodeSrc = apiQrCodeGen + "?data=" + qrParams.data + "&size=" + qrParams.size + "&format=" + qrParams.format;

                res.render("result.ejs", {
                    shortUrl: shortUrlResult,
                    qrCodeUrl: qrCodeSrc,
                });

            } catch (error) {
                console.log("Error getting the Qr Code. ", error)
            };
        
    } catch (error) {
        console.error("Error getting the short URL: ", error);

        res.render("index.ejs", {
            errorMessage: error.response.data.AliasError,
        });
    };
});

app.get("/try-again", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
 console.log("Server listening on port " + port);
});