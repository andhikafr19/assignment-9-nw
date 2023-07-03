let vacancies = [
    {
        name : 'DevOps Engineer',
        quota : 3
    },
    {
        name : 'Database Administrator',
        quota : 3
    },
    {
        name : 'Web Developer',
        quota : 3
    },
    {
        name : 'Mobile Developer',
        quota : 0
    }
]

let positions = [
    'Bandung',
    'Surabaya',
    'Bali',
    'Jakarta',
    'Semarang'
    
]

let applications = [

]

let errors = {}

$(document).ready(function () {
    vacancies.forEach(function (vacancy) {
        let option = `<option value="${vacancy.name}">${vacancy.name}</option>`
        $('select#vacancy').append(option)
    })

    positions.forEach(function (position) {
        let option = `<option value="${position}">${position}</option>`
        $('select#position').append(option)
    })
})

$('#form-detail select[name="vacancy"]').on('change', function () {
    let value = this.value
    let quota = 0;
    vacancies.forEach(function(vacancy) {
        if (vacancy.name == value) {
            quota = vacancy.quota
        }
    })

    $(this).parent().children('div.helper, div.invalid-feedback').remove();
    $(this).removeClass('is-invalid');
    if (value) {
        let helper = document.createElement('div');
        helper.classList.add('helper')
        $('#form-detail [type="submit"]').disabled = false
        if (quota <= 0) {
            helper.innerHTML = `Mohon maaf, rekrutasi untuk ${value} sudah penuh.`
            helper.classList.remove('helper')
            helper.classList.add('invalid-feedback')
            $(this).addClass('is-invalid');
        } else if (quota <= 2) {
            helper.innerHTML = `Kuota tersisa untuk ${value} hanya ${quota} pendaftar`
        } else {
            helper.innerHTML = `Anda dapat memilih lowongan ${value}`

        }
        $(this).parent().append(helper);
    }
})

$('#form-detail').on('submit', function (e) {
    e.preventDefault();
    validateForm();

    $('#form-detail :input').each(function () {
        $(this).parent().children('div.invalid-feedback').remove();
        $(this).removeClass('is-invalid');
        if (errors.hasOwnProperty($(this).attr('name'))) {
            let errorMessage = document.createElement('div');
            errorMessage.classList.add('invalid-feedback');
            errorMessage.innerHTML = errors[$(this).attr('name')];
            $(this).parent().append(errorMessage);
            $(this).addClass('is-invalid');
        }

    })

    if (Object.keys(errors).length !== 0) {
        return false
    }

    let formData = {}
    $('#form-detail :input').each(function () {
        if (this.value) {
            formData[this.name] = this.value
        }
    })
    let formResult = ''
    formResult = formResult + `<div>`
    formResult = formResult + `<div class="mb-3">Pendaftar ke-${applications.length +1}</div>`
    formResult = formResult + `<div>Full Name</dt><dd class="mt-2">${formData.fullname ?? ''}</div>`
    formResult = formResult + `<div>Email</dt><dd class="mt-2">${formData.email ?? ''}</div>`
    formResult = formResult + `<div>Nomor Telepon</dt><dd class="mt-2">${formData.nophone ?? ''}</div>`
    formResult = formResult + `<div>Lowongan</dt><dd class="mt-2">${formData.vacancy ?? ''}</div>`
    formResult = formResult + `<div>Posisi</dt><dd class="mt-2">${formData.position ?? ''}</div>`
    formResult = formResult + `</div>`

    alert('Data Berhasil Disimpan')

    applications.push(formData)
    vacancies.forEach(function (vacancy) {
        if (vacancy.name === formData.vacancy) {
            vacancy.quota--
        }
    })
    $('#form-result').show()
    $('#form-result').html(formResult)
})

function validateForm() {
    errors = {};

    $('#form-detail :input').each(function () {
        if (!this.value && this.name !== "") {
            errors[this.name] = this.name + ' Wajib diisi'
            return true;
        }

        if (this.name === 'vacancy') {
            let value = this.value
            vacancies.forEach(function (vacancy) {
                if (vacancy.name === value) {
                    if (vacancy.quota <= 0) {
                        errors['vacancy'] = `Mohon maaf, rekrutasi untuk posisi ${value} sudah penuh.`
                    }
                }
            })
        }
    })
}

// console.log(applications)