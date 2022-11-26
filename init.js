window.onload = function () {

    let initPerson = personGenerator.getPerson();

    // Вывод сгенерированных данных
    function genCard() {
        document.getElementById('genderOutput').innerText = initPerson.gender;
        document.getElementById('firstNameOutput').innerText = initPerson.firstName;
        document.getElementById('surnameOutput').innerText = initPerson.surname;
        document.getElementById('birthYearOutput').innerText = initPerson.birthYears;
        document.getElementById('patronymicOutput').innerText = initPerson.patronymic;
        document.getElementById('professionOutput').innerText = initPerson.profession;
    }
    genCard();
    
    // Вывод новых сегенерированных данных при клике по кнопке "сгенерировать"
    document.querySelector('.btn-gen').addEventListener('click', function () {
        initPerson = personGenerator.getPerson();
        genCard();
    });

    // Очистка полей формы
    document.querySelector('.btn-reset').addEventListener('click', function () {
        document.getElementById('genderOutput').innerText = '';
        document.getElementById('firstNameOutput').innerText = '';
        document.getElementById('surnameOutput').innerText = '';
        document.getElementById('birthYearOutput').innerText = '';
        document.getElementById('patronymicOutput').innerText = '';
        document.getElementById('professionOutput').innerText = '';
    });


};