<script setup></script>
<template>
    <div class="p-4 mb-5 bg-gray-800 w-[800px] rounded-[40px] text-white">
    <a href="#javascript-info" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">1# JavaScript туралы</a>

    <a href="#javascript-basic" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">2# JavaScript негіздері</a>
    <a href="#javascript-function" class="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg m-2">3# JavaScript функциялары жөнінде құжаттама</a>
    
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

</template>
<style scoped></style>
