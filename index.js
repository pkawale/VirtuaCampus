// const chatgpt = require('chatgpt')();

const app = require('express')();
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
const PORT = 8080;
const cors = require('cors');
const chatgpt_key = "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";
const puppeteer = require("puppeteer");

// async function example() {
//     const api = new ChatGPTAPI({
//         apiKey:chatgpt_key
//     })

//     const res = await api.sendMessage('Hello World!')
//     console.log(res.text)
// }

function getData(college_name) {
    return new Promise(function (resolve, reject) {
        let url = "https://api.data.gov/ed/collegescorecard/v1/schools?" +
            "api_key=VLVjqoMalETOC3htY56CJ7Q5b3g5bCXQf8CwHzSt&school.name="+college_name;
        let result = null;
        fetch(url).then((res) => {
                result = res.json();
                console.log('result fetched', result);
                resolve(result)
            },(error)=>{
                reject(error)
            }
        );
    })
}

function getAllCollegeData() {
    return new Promise(function (resolve, reject) {
        let url = "https://api.data.gov/ed/collegescorecard/v1/schools?" +
            "api_key=VLVjqoMalETOC3htY56CJ7Q5b3g5bCXQf8CwHzSt&";
        let result = null;
        fetch(url).then((res) => {
                result = res.json();
                console.log('result fetched', result);
                resolve(result)
            },(error)=>{
                reject(error)
            }
        );
    })
}

app.use(cors({
    origin: '*'
}));
app.get('/college', async function (req, res) {
    let college_name = req.query.name;
    let data = await getData(college_name);
    if(data.results.length === 0) {
        res.status(404).send("Incorrect College name");
    }else {
        res.status(200).send(data);
    }
});


app.get('/collegeurl', async function (req, res) {
    let college_name = req.query.name;
    let url = await getWebiteData(college_name)
    if(url.results.length === 0) {
        res.status(404).send("Incorrect College name");
    }else {
        res.status(200).send(url);
    }
});
async function getWebiteData(url) {
    return (await new Promise(async function (resolve, reject) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const websiteContent = await page.evaluate(() => Array.from(
            document.querySelectorAll('a[href]'),
            a => a.getAttribute('href')
        ));
        let admissionUrls = [];
        for (let i = 0; i < websiteContent.length; i++) {
            if (websiteContent[i].includes("/apply")) {
                admissionUrls.push(websiteContent[i]);
            }
        }
        console.log({admissionUrls})
        console.log("----------------------------")
        if (!admissionUrls[0].includes("http")) {
            admissionUrls[0] = url + admissionUrls[0]
        }
        await page.goto(admissionUrls[0], 0);
        const websiteContent1 = await page.evaluate(() => Array.from(
            document.querySelectorAll('a[href]'),
            a => a.getAttribute('href')
        ));
        let adUrls = [];
        for (let i = 0; i < websiteContent1.length; i++) {
            if (websiteContent1[i].includes("graduate") || websiteContent1[i].includes("grad")) {
                if(websiteContent1[i].includes('admissions') && websiteContent1.includes('apply')){
                    if (!websiteContent1[i].includes("http")) {
                        websiteContent1[i] = url + websiteContent1[i]
                    }
                    resolve(websiteContent1[i]);
                }
                adUrls.push(websiteContent1[i]);
            }
        }

        console.log(adUrls);


    }));
}

app.listen(PORT, () =>{
    console.log("Node application is Up!");
    // example().then(r => console.log(r));
})
