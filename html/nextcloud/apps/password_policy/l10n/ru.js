OC.L10N.register(
    "password_policy",
    {
    "Password needs to be at least %s characters long" : "Длина пароля должна быть не менее %s символов",
    "Password needs to contain at least one lower and one upper case character." : "В пароле должны присутствовать и прописные и строчные буквы.",
    "Password needs to contain at least one numeric character." : "Пароль должен содержать хотя бы одну цифру.",
    "Password needs to contain at least one special character." : "Пароль должен содержать хотя бы один специальный символ.",
    "Password is among the 1,000,000 most common ones. Please make it unique." : "Пароль находится в списке 1 000 000 наиболее распространённых паролей. Придумайте что-нибудь более оригинальное.",
    "Password is present in compromised password list. Please choose a different password." : "Пароль присутствует в списке скомпрометированных паролей. Пожалуйста, выберите другой пароль.",
    "Password policy" : "Правила создания паролей",
    "Allows admins to configure a password policy" : "Разрешенные администраторы для конфигурирования политики паролей",
    "Allow admin to define certain pre-conditions for password, e.g. enforce a minimum length" : "Разрешить администратору определять определенные предварительные условия для пароля, например. обеспечить минимальную длину пароля",
    "Minimal length" : "Минимальная длина",
    "Forbid common passwords" : "Запрет простых паролей",
    "Enforce upper and lower case characters" : "Требовать наличия в пароле и прописных и строчных букв ",
    "Enforce numeric characters" : "Требовать наличия в пароле цифр",
    "Enforce special characters" : "Требовать наличия в пароле спецсимволов",
    "Check password against the list of breached passwords from haveibeenpwned.com" : "Проверка пароля относительно списка слабых паролей из базы сайта haveibeenpwnd.com",
    "This check creates a hash of the password and sends the first 5 characters of this hash to the haveibeenpwned.com API to retrieve a list of all hashes that start with those. Then it checks on the Nextcloud instance if the password hash is in the result set." : "Эта проверка создает хэш пароля и отправляет первые 5 символов этого хэша в API hasibeenpwned.com, чтобы получить список всех хэшей, которые начинаются с них. Затем он проверяет инстанс Nextcloud, если хеш пароля находится в полученном списке."
},
"nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);");
