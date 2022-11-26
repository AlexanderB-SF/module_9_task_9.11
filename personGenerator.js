const personGenerator = {
    
    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    patronymicJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александров",
            "id_2": "Максимов",
            "id_3": "Иванов",
            "id_4": "Артёмов",
            "id_5": "Дмитриев",
            "id_6": "Николаев",
            "id_7": "Михаилов",
            "id_8": "Данилов",
            "id_9": "Егоров",
            "id_10": "Андреев"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александра",
            "id_2": "Мария",
            "id_3": "Елена",
            "id_4": "Ангелина",
            "id_5": "Виктория",
            "id_6": "Анастасия",
            "id_7": "Светлана",
            "id_8": "Дарья",
            "id_9": "Ирина",
            "id_10": "Евгения"
        }
    }`,
    professionsMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Автослесарь",
            "id_2": "Шахтёр",
            "id_3": "Электрик",
            "id_4": "Сварщик",
            "id_5": "Водитель погрузчика",
            "id_6": "Крановщик",
            "id_7": "Лётчик",
            "id_8": "Строитель",
            "id_9": "Барбер",
            "id_10": "Машинист"
        }
    }`,
    professionsFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Маркетолог",
            "id_2": "Стилист",
            "id_3": "Дизайнер",
            "id_4": "Повар",
            "id_5": "Аналитик",
            "id_6": "Кондитер",
            "id_7": "Бухгалтер",
            "id_8": "Юрист",
            "id_9": "Парикмахер",
            "id_10": "Экономист"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',
    surnameFemaleEnd: "а",
    patronymicMaleEnd: "ич",
    patronymicFemaleEnd: "на",
    yearMin: 1975,
    yearMax: 2003,
    dayMin: 1,
    dayMax: 31,
    monthMin: 0,
    monthMax: 11,


    // Генерация случайного числа
    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    // Генерация свойства в объекте json
    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    // Генерация пола
    randomGender: function () {
        return (this.randomIntNumber() === 0)? this.GENDER_FEMALE : this.GENDER_MALE;
    },
    
    // Определение гендера
    sampleGender: function (male, female) {
        if (this.person.gender == this.GENDER_MALE) {
            return male;
        } else {
            return female;
        }
    },

    // Генерация имени
    randomFirstName: function() {
        return this.sampleGender(this.randomValue(this.firstNameMaleJson), this.randomValue(this.firstNameFemaleJson));
    },

    // Генерация фамилии
    randomSurname: function() {
        return this.sampleGender(this.randomValue(this.surnameJson), `${this.randomValue(this.surnameJson)}${this.surnameFemaleEnd}`);
    },

    // Генерация Отчества
    randomPatronymic: function() {
        return this.sampleGender(`${this.randomValue(this.patronymicJson)}${this.patronymicMaleEnd}`, `${this.randomValue(this.patronymicJson)}${this.patronymicFemaleEnd}`);
    },

    // Генерация даты рождения
    randomBirthYears: function() {
        let day = this.randomIntNumber(this.dayMax, this.dayMin);
        const month = this.randomIntNumber(this.monthMax, this.monthMin);
        const year = this.randomIntNumber(this.yearMax, this.yearMin);
        
        function randDate(year, month, day) {
            let date = new Date(year, month, day).toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return date;
        }

        if (month === 1) {
            day = 28;
        } else if (month % 2 !== 0) {
            day = 30;
        }
        
        return randDate(year, month, day);
    },

    // Генерация профессии
    randomProfession: function() {
        return this.sampleGender(this.randomValue(this.professionsMaleJson), this.randomValue(this.professionsFemaleJson));
    },

    // Конструктор объекта, которые создает наовую персону.
    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName();
        this.person.surname = this.randomSurname();
        this.person.patronymic = this.randomPatronymic();
        this.person.birthYears = this.randomBirthYears();
        this.person.profession = this.randomProfession();
        return this.person;
    }

};