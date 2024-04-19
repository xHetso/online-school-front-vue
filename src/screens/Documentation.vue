<script setup></script>
<template>
    <div class="p-4 mb-5 bg-gray-800 w-[800px] rounded-[40px] text-white">
    <a href="#javascript-info" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">1# JavaScript туралы</a>

    <a href="#javascript-basic" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">2# JavaScript негіздері</a>
    <a href="#javascript-function" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">3# JavaScript функциялары жөнінде құжаттама</a>
    <a href="#javascript-objects" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">4# JavaScript объектілері</a>
    <a href="#javascript-async" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">5# JavaScript асинхрон программалау</a>
    <a href="#javascript-server-side" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">6# Сервер жағы JavaScript</a>
    <a href="#javascript-testing" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">7# JavaScript тестілеу</a>
    <a href="#javascript-frameworks" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">8# JavaScript фреймворктары</a>
</div>

    
    <div class="bg-gray-800 text-white rounded-[40px] p-4">
        <div class="bg-gray-800 text-white rounded-[40px] p-4">
        <div class="container mx-auto p-4">
            <img src="../assets/images/image copy.png" class="mb-10" alt="">
            <h1 class="text-3xl font-bold">JavaScript туралы</h1>
            <p class="mt-4">JavaScript, қысқаша JS - бұл <span class="font-semibold">жеңіл және интерпретацияланатын бағдарламалау тілі</span>, ол JIT режимінде компиляциялануы мүмкін. Бұл тіл веб-беттердегі скрипттерді жазу үшін жиі қолданылады, бірақ ол сондай-ақ <a href="https://nodejs.org" class="text-blue-500">Node.js</a> және <a href="https://couchdb.apache.org" class="text-blue-500">Apache CouchDB</a> сияқты әртүрлі бағдарламалық шешімдерде қолданылады. JavaScript прототиптік бағытталған, бірнеше бағдарламалау парадигмаларын қолдайды және динамикалық типтік анықтаумен ерекшеленеді. Бұл тіл объектіге бағытталған, императивті және декларативті бағдарламалау стильдерін қолдайды, оның ішінде функционалды бағдарламалау.</p>
            <p class="mt-4">Бұл сайттың бөлімі JavaScript тіліне арналған және ол веб-беттердің ерекшеліктері немесе JavaScript орындалатын ортаға қатысты мәселелерді қамтымайды. Веб-беттерге қатысты API-ға қатысты ақпарат <a href="https://developer.mozilla.org/en-US/docs/Web/API" class="text-blue-500">Веб-API</a> және <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" class="text-blue-500">DOM</a> бөлімдерінде көрсетілген.</p>
            <p class="mt-4">JavaScript тілінің стандарты - <a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-262/" class="text-blue-500">ECMAScript</a>. 2012 жылға қарай, барлық заманауи шолғыштар ECMAScript 5.1-ді толық қолдайды. Ескі шолғыштардың кем дегенде ECMAScript 3-ті қолдайтыны белгілі. 2015 жылдың 17 маусымында ECMAScript-тің алтыншы нұсқасы шықты. Бұл нұсқа ресми түрде ECMAScript 2015 деп аталады, оны жиі ECMAScript 2015 немесе қарапайым ES2015 деп атайды.</p>
            <h2 class="text-2xl font-bold mt-6">ES6 жаңалықтары</h2>
            <p class="mt-4">ES6 немесе ECMAScript 2015 бірқатар маңызды жаңалықтарды ұсынды, олар JavaScript бағдарламалауды жетілдірді және жеңілдетті. Осыған қатысты кейбір маңызды жаңалықтар:</p>
            <ul class="list-disc list-inside">
                <li><strong>Кеңейтілген обьект литералдары</strong>: Объекттердің қысқа жазылуы және динамикалық қасиеттерді оңай қосу мүмкіндігі.</li>
                <li><strong>Жаңа модуль жүйесі</strong>: `import` және `export` синтаксисы арқылы модульдік бағдарламалау.</li>
                <li><strong>Стрелка функциялары</strong>: `=>` синтаксисы арқылы қысқа және оңай анонимді функцияларды жасау.</li>
                <li><strong>Константалар</strong>: `const` кілт сөзі арқылы өзгермейтін айнымалылар жариялау.</li>
                <li><strong>Өзгермелі айнымалылар</strong>: `let` кілт сөзі арқылы блоктық көріну аймағы бар айнымалылар жариялау.</li>
            </ul>
            <h3 class="text-xl font-bold mt-6">ES6 Код Үлгілері</h3>
            <p class="mt-4">Мысалы, ES6 стрелка функцияларының қолданылуы:</p>
            <pre class="bg-gray-700 text-white p-2 rounded-lg">
    <code>// Ескі синтаксис
    function sum(a, b) {
        return a + b;
    }

    // ES6 стрелка функциясы
    const sum = (a, b) => a + b;
    </code></pre>
            <p class="mt-4">Бұл тек бірнеше ES6 жаңалықтары. ECMAScript әр жыл сайын жаңартылады, осыған байланысты жаңа мүмкіндіктер мен жаңалықтар пайда болады.</p>
        </div>
        </div>
    </div>

    <div class="bg-gray-800 text-white rounded-[40px] p-4 mt-8">
        <div class="bg-gray-800 text-white rounded-[40px] p-4">
            <div class="container mx-auto p-4">
                <h2 class="text-3xl font-bold" id="javascript-basic">JavaScript негіздері</h2>
                <p class="mt-4">JavaScript - бұл веб-әзірлеуде өте маңызды, жеңіл үйренілетін және кең қолданылатын бағдарламалау тілі. Осы бөлімде біз JavaScript-тің негіздерін қарастырамыз, оның ішінде синтаксис, айнымалылар, деректер түрлері, операторлар, шартты білдірулер мен циклдар.</p>
                <h3 class="text-xl font-bold mt-6">Синтаксис</h3>
                <p class="mt-4">JavaScript синтаксисі C++ немесе Java сияқты басқа бағдарламалау тілдеріне ұқсас. Ол код блоктары үшін жақша қосқыштарды және инструкцияларды бөлу үшін нүктелі үтірді қолданады.</p>
                <h3 class="text-xl font-bold mt-6">Айнымалылар</h3>
                <p class="mt-4">JavaScript-те айнымалылар `var`, `let` немесе `const` кілт сөздерін пайдаланып жасалады. `let` блоктық көріну аймағы бар айнымалыны білдіреді, `var` - функционалдық аймақтық, ал `const` - тұрақтылар үшін.</p>
                <h3 class="text-xl font-bold mt-6">Деректер түрлері</h3>
                <p class="mt-4">JavaScript динамикалық типтелген тіл. Оның негізгі деректер түрлеріне сандар, жолдар, логикалық мәндер, нысандар, null және undefined кіреді.</p>
                <h3 class="text-xl font-bold mt-6">Операторлар</h3>
                <p class="mt-4">JavaScript арифметикалық, салыстыру және логикалық операторларды қолдайды.</p>
                <h3 class="text-xl font-bold mt-6">Шартты білдірулер</h3>
                <p class="mt-4">Шартты білдірулер белгілі бір шарттарға байланысты әр түрлі кодты орындауға мүмкіндік береді.</p>
                <h3 class="text-xl font-bold mt-6">Циклдар</h3>
                <p class="mt-4">Циклдар код блогын бірнеше рет орындау үшін қолданылады. `for`, `while` және `do...while` - JavaScript-тің негізгі цикл түрлері.</p>
            </div>
        </div>
    </div>

    <div class="bg-gray-800 text-white rounded-[40px] p-4 mt-8">
        <div class="container mx-auto p-4">
            <h1 class="text-3xl font-bold" id="javascript-function">JavaScript функциялары жөнінде құжаттама</h1>
            <h2 class="text-2xl font-bold mt-6">1. Функцияларды жариялау</h2>
            <pre class="bg-gray-700 text-white p-2 rounded-lg">
    <code>function функцияАты(параметрлер) {
        // функция денесі
    }</code></pre>

            <h2 class="text-2xl font-bold mt-6">2. Анонимді функциялар</h2>
            <pre class="bg-gray-700 text-white p-2 rounded-lg">
    <code>function(параметрлер) {
        // функция денесі
    }</code></pre>

            <h2 class="text-2xl font-bold mt-6">3. Стрелкалық функциялар</h2>
            <pre class="bg-gray-700 text-white p-2 rounded-lg">
    <code>(параметрлер) => {
        // функция денесі
    }</code></pre>

            <h2 class="text-2xl font-bold mt-6">4. Функция параметрлері</h2>
    <pre class="bg-gray-700 text-white p-2 rounded-lg">
    <code>function sum(a, b) {
        return a + b;
    }</code></pre>

            <h2 class="text-2xl font-bold mt-6">5. Мәндерді қайтару</h2>
            <pre class="bg-gray-700 text-white p-2 rounded-lg">
    <code>function getDouble(number) {
        return number * 2;
    }</code>
            </pre>

            <p class="mt-4">JavaScript-те функцияларды пайдалану кодты тиімді түрде құрылымдауға, оны оқымалы етіп жасауға және тестілеу және дебагтау үшін жеңілдетуге мүмкіндік береді. Әртүрлі функция түрлерінің және олардың ерекшеліктерінің маңызын түсіну JavaScript әзірлеуші үшін негізгі дағды болып табылады.</p>
        </div>
    </div>
    <div class="bg-gray-800 text-white rounded-[40px] p-4 mt-8">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold" id="javascript-objects">JavaScript объектілері</h1>
        <p class="mt-4">JavaScript-те объектілер - бұл кілттер мен мәндерден тұратын құрылымдар, олардың арқасында бір немесе бірнеше мәліметтерді бірлестіруге болады. Объекттер деректер моделін құру үшін қолданылады және олардың әрбір қасиетіне кілт арқылы қол жеткізуге болады.</p>
        <pre class="bg-gray-700 text-white p-2 rounded-lg">
        <code>const person = {
            name: "John",
            age: 30,
            greet: function() { console.log("Hello, " + this.name); }
        };
        person.greet(); // Outputs: Hello, John
        </code></pre>
                <p class="mt-4">JavaScript объекттері әртүрлі әдістерді және қасиеттерді қамтуы мүмкін, және оларды әр түрлі тіл элементтерімен қолдануға болады.</p>
            </div>
        </div>
        <div class="bg-gray-800 text-white rounded-[40px] p-4 mt-8">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold" id="javascript-async">JavaScript асинхрон программалау</h1>
        <p class="mt-4">JavaScript асинхрон программалауда Promise объектілерін, async және await кілт сөздерін пайдаланады. Бұл әдістер веб-сұраныстар сияқты кідіртпелі операцияларды жеңілдетуге мүмкіндік береді.</p>
        <pre class="bg-gray-700 text-white p-2 rounded-lg">
        <code>// Promise қолдану мысалы
        fetch('https://api.example.com/data')
            .then(response => response.json())
            .then(data => console.log(data));

        // Async/Await қолдану мысалы
        async function fetchData() {
            const response = await fetch('https://api.example.com/data');
            const data = await response.json();
            console.log(data);
        }
        fetchData();
        </code></pre>
                <p class="mt-4">Асинхрон программалау кодтың оқымалылығын арттырады және кідіртпелі кодты басқаруды жеңілдетеді.</p>
            </div>
        </div>
        <div class="bg-gray-800 text-white rounded-[40px] p-4 mt-8">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold" id="javascript-server-side">Сервер жағы JavaScript</h1>
        <p class="mt-4">Node.js - бұл сервер жағында JavaScript кодын орындауға мүмкіндік беретін платформа. Ол асинхрондық оқиға-бағытталған API-ларды қолдайды, бұл веб-серверлерді және басқа да сервер жағы қосымшаларын жылдам құруға мүмкіндік береді.</p>
        <pre class="bg-gray-700 text-white p-2 rounded-lg">
        <code>const http = require('http');

        const server = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello World\n');
        });

        server.listen(3000, () => {
            console.log('Server running at http://localhost:3000/');
        });
        </code></pre>
                <p class="mt-4">Node.js кең тараған веб-фреймворктармен, мәліметтер базасымен және басқа серверлік құралдармен жұмыс істеуге қабілетті.</p>
            </div>
        </div>
        <div class="bg-gray-800 text-white rounded-[40px] p-4 mt-8">
            <div class="container mx-auto p-4">
                <h1 class="text-3xl font-bold" id="javascript-testing">JavaScript тестілеу</h1>
                <p class="mt-4">Тестілеу - бұл JavaScript кодының сенімділігін және жұмыс істеуін қамтамасыз ету үшін маңызды процесс. Jest, Mocha, және Jasmine сияқты тестілеу кітапханалары кең таралған.</p>
                <pre class="bg-gray-700 text-white p-2 rounded-lg">
        <code>// Jest қолдану мысалы
        test('adds 1 + 2 to equal 3', () => {
            expect(1 + 2).toBe(3);
        });
        </code></pre>
                <p class="mt-4">Бұл кітапханалар кодтың тұрақтылығын арттыруға және бағдарламалық қамтамасыз етудің сапасын жақсартуға көмектеседі.</p>
            </div>
        </div>
        <div class="bg-gray-800 text-white rounded-[40px] p-4 mt-8">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold" id="javascript-frameworks">JavaScript фреймворктары</h1>
        <p class="mt-4">JavaScript фреймворктары, мысалы React, Angular және Vue, веб-қосымшаларды жылдам әрі тиімді құруға мүмкіндік береді. Олар қолданушы интерфейсінің күрделі элементтерін жеңілдетеді және көптеген құрылғыларға бейімделуге көмектеседі.</p>
                <p class="mt-4">Бұл фреймворктар әзірлеу процесін стандартизациялайды және кодтың қайта пайдаланымдылығын жақсартады.</p>
            </div>
        </div>

</template>
<style scoped></style>
