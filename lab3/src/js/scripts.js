function myFunction(){
	var m_check = f_check = s_check = th_check = four_check = true;
    var validateBtn = form.querySelector('.validateBtn');
    
	var elem = document.getElementById("frm");

	if (elem == null) return;

	var name = String(elem[0].value);
	var surname = String(elem[1].value);
	var nickname = String(elem[2].value);
	var age = String(elem[3].value);
	var ielts = String(elem[4].value);
	var dateOfBirth = String(elem[5].value);
	var mail = String(elem[6].value);
	var pasword = String(elem[7].value);
	var checkPasword = String(elem[8].value);

	if ((nickname == 0)||(mail == 0)||
		(pasword == 0)||(checkPasword == 0)){
			document.getElementById("informat").innerHTML = "Заповніть всі обов'язкові поля";
			m_check = false;
			return;
	}

	f_check = nickNameCheck(nickname);
	s_check = mailCheck(mail);
	
//checking password
	if (pasword.length >= 8){
		var tmp = pasword.split("");
		var S,s,n;
		var i;
		for	(i = 0; i < pasword.length; i++){
			if (('A' <= tmp[i]) && ('Z' >= tmp[i])){
				S = true;
			} else if (('a' <= tmp[i]) && ('z' >= tmp[i])){
				s = true;
			} else if (('0' <= tmp[i]) && ('9' >= tmp[i])){
				n = true;
			} else {
				document.getElementById("inf_pasword").innerHTML = "У паролі є недопустимі символи.";
				th_check = false;
			}
		}
		if (!S || !s || !n){
			document.getElementById("inf_pasword").innerHTML = "Пароль не відповідає вимогам.";
			th_check = false;
		}
	} else {
		document.getElementById("inf_pasword").innerHTML = "Пароль занадто короткий.";
		th_check = false;
	}
				
	if(pasword != checkPasword){
		document.getElementById("inf_checkPasword").innerHTML = "Поля пароля та його перевірки не співпадають.";
		four_check = false;
	}
	
//similar parts of code
	if (name != 0){
		var tmp = name.split("");
		var i;
		for	(i = 0; i < name.length; i++){
			if((('0' <= tmp[i]) && ('9' >= tmp[i]))||
				(' ' == tmp[i])||('.' == tmp[i])||
				(',' == tmp[i])||('_' == tmp[i])){
					document.getElementById("inf_name").innerHTML = "Ім'я не може містити цифри, пробіл та такі знаки '.,_'.";
			}
		}
	}
	if (surname != 0){
		var tmp = surname.split("");
		var i;
		for	(i = 0; i < surname.length; i++){
			if((('0' <= tmp[i]) && ('9' >= tmp[i]))||
				(' ' == tmp[i])||('.' == tmp[i])||
				(',' == tmp[i])||('_' == tmp[i])){
					document.getElementById("inf_surname").innerHTML = "Прізвище не може містити цифри, пробіл та такі знаки '.,_'.";
			}
		}
	}

//checking age
	if (age != 0){
		if (+age < 18){
			alert("ВАМ НЕМАЄ 18 РОКІВ!");
		} else {
			if (!Number.isInteger(+age)){
				document.getElementById("inf_age").innerHTML = "Вказано не ціле число.";
			}
		}
	}
	
//checking ielts
	if (ielts != 0){
		if (('0' <= ielts[0]) && ('9' >= ielts[0]) && ('0' <= ielts[2]) && ('9' >= ielts[2])){
			if (ielts.indexOf(".") == ielts.length - 2){
			} else if (ielts.indexOf(",") == ielts.length - 2){
			} else {
				document.getElementById("inf_ielts").innerHTML = "Бал вказано не за форматом.";
			}
		} else {
			document.getElementById("inf_ielts").innerHTML = "Бал вказано не за форматом.";
		}
	}

//checking day of birth
	if (dateOfBirth != 0){
		if (dateOfBirth.length == 10){
			var res = dateOfBirth.split(".",3);
			if ((res[1].length == 2)&&(+res[1] < 13)&&(+res[1] > 0)){
				if ((res[2].length == 4)&&(+res[2] > 1901)&&(+res[2] < 2001)){
					if (((+res[1] == 1)||(+res[1] == 3)||(+res[1] == 5)||
						(+res[1] == 7)||(+res[1] == 8)||(+res[1] == 10)||
						(+res[1] == 12))&&((+res[0] < 32)&&(+res[0] > 0))){
							//return true;
					} else {				
						if (((+res[1] == 4)||(+res[1] == 6)||
							(+res[1] == 9)||(+res[1] == 11))&&
							((+res[0] < 31)&&(+res[0] > 0))){
								//return true;
						} else {
							if ((+res[1] == 2)&&(+res[0] < 30)&&(+res[0] > 0)){
							if (+res[2]%4 == 0){
									//return true;
								} else {
									if (+res[0] != 29){
										//return true;
									}
								}
							} else {
								document.getElementById("inf_dateOfBirth").innerHTML = "Невірний формат.";
							}
						}
					}
				} else {
					document.getElementById("inf_dateOfBirth").innerHTML = "Невірний формат.";
				}
			} else {
				document.getElementById("inf_dateOfBirth").innerHTML = "Невірний формат.";
			}
		} else {
			document.getElementById("inf_dateOfBirth").innerHTML = "Невірна кількість символів (має бути - 10).";
		}
	}

	if(m_check && f_check && s_check && th_check && four_check){
		if (validateBtn) {
		  validateBtn.addEventListener('click', function(event) {
			  const elem = {
				data: {
					name: name.value,
					surname: surname.value,
					nickname: nickname.value,
					pasword: pasword.value,
					date: date.value,
					num: num.value,
					numr: numr.value,
				},
			  };

			  fetch('send', {
				  method: 'POST',
				  headers: {
					  "Content-Type": "application/json"
				  },
				  body: JSON.stringify(elem),
			  })
			  .catch(error => console.log(error));
		  });

		}
		document.getElementById("frm").submit();
	}
}

function nickNameCheck(nickname){
	if (nickname.length >= 4){
		var tmp = nickname.split("");
			if (('A' <= tmp[0]) && ('Z' >= tmp[0])||
					('a' <= tmp[0]) && ('z' >= tmp[0])){
						var i;
						for	(i = 1; i < nickname.length; i++){
							if ((' ' == tmp[i])||(',' == tmp[i])){
								document.getElementById("inf_nickname").innerHTML = "Нікнейм не може містити пробіл та ','";
								return false;
							}
						}
						return true;
			} else {
				document.getElementById("inf_nickname").innerHTML = "Нікнейм не підходить до вимог.";
				return false;
			}
	} else {
		document.getElementById("inf_nickname").innerHTML = "Недостатня кількість символів у Нікнеймі(мінімум - 4).";
		return false;
	}
}

function mailCheck(mail){
	if (mail.length >= 5){
		var tmp = mail.split("");
		var rav = 0;
		var dot = 0;
		var i;
		for	(i = 1; i < mail.length; i++){
			if ('@' == tmp[i]){
				rav++;
			}
			if (('.' == tmp[i])&&(rav > 0)){
				dot++;
			}
		}
		if (rav!=1 || dot!=1){
			document.getElementById("inf_mail").innerHTML = "Невірна емейл адреса.";
			return = false;
		}
		return true;
	} else {
		document.getElementById("inf_mail").innerHTML = "Невірна емейл адреса.";
		return false;
	}
}

function getExistingUsers() {
    fetch('dta.json')
    .then(data => {
        return data.json();
    })
    .then(data => {
        var list = document.getElementById('data');
        const realData = data;
        var res = [];

        if (parseInt(realData.count) === 0) {
          document.getElementById('message').innerHTML = "Жодного зареєстрованого користувача!";
        } else {
            document.getElementById('message').innerHTML = "Користувачі";
            Object.keys(realData).forEach(k => {
                Object.keys(realData[k]).forEach(v => {
                    (res[v] = (res[v] || { id: v }))[k] = realData[k][v];
                });
            });

            res.forEach(elem => {
                var newLi = document.createElement('li');
                newLi.innerHTML = `
                    Ім'я = ${elem.name}<br>
                    Прізвище = ${elem.surname}<br>
                    Нікнейм = ${elem.nickname}<br>
                    Дата народження = ${elem.date}<br>
                    Повних років = ${elem.num}<br>
                    Бал Ielts = ${elem.numr}<br>
                    Пароль = ${elem.pasword}
                `;
                list.appendChild(newLi);
            });
        }
    })
    .catch(error => console.log(error));
}