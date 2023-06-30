let vacancies = [
    {
        name : 'DevOps Engineer',
    },
    {
        name : 'Database Administrator',
    },
    {
        name : 'Web Developer',
    },
    {
        name : 'Mobile Developer',
    }
]

let positions = [
    'Bandung',
    'Surabaya',
    'Bali',
    'Jakarta',
    'Semarang'
    
]

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