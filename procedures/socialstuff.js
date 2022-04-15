// Format here pulled from CJ Brickhouse:
// https://github.com/chrisbrickhouse/Experiment-templates/blob/master/audio-norming/demo-questions.js

var make_question = function (label, inner_html) {
    var question = '<div class="demo-question-wrapper">' +
        '<li class="demographic-question">' + label + '</li>' +
        inner_html +
        '</div>';
    return question;
}

var html_input = function (QObj) {
    if (QObj.type == 'checkbox') {
        var ret = '<div class="form-checkbox-label"><label for="' + QObj.name + '">' +
            '<input type="checkbox" class="input-checkbox-option" name="' + QObj.name + '" /> ' +
            '<span>' + QObj.label + '</span>' +
            '</label></div>';
    } else if (QObj.type == 'time') {
        var ret = '<div class="form-year-label">' +
            '<input type="text" required class="input-year-textbox" name="' + QObj.name + '"placeholder="" />' +
            '</div>';
    } else if (QObj.type == 'text-entry') {
        var ret = '<div class="form-year-label">' +
            '<input type="text" required class="input-year-textbox" rows="2" cols="50" name="' + QObj.name + '"placeholder="" />' +
            '</div>';
    } else if (QObj.type == 'radio') {
        var ret = '<div class="form-radio-label"><label for="' + QObj.id + '">' +
            '<input type="radio" required name="' + QObj.name + '" id="' + QObj.id + '" value="' + QObj.id + '" />' +
            '<span>' + QObj.label + '</span>' +
            '</label></div>'
    } else if (QObj.type == 'resp-other') {
        var ret = QObj.label + '<input class="resp-other" required type="text" name="' + QObj.name + '" />'
    } else if (QObj.type === 'select') {
        var ret = '<div class="form-select"><label for="' + QObj.name + '">' + QObj.label + '</label>' +
            '<select name="' + QObj.name + '">';
        ret += '<option value="" selected disabled hidden></option>';
        for (var i = 0; i < QObj.options.length; i++) {
            ret = ret + html_input(QObj.options[i])
        }
        ret = ret + '</select></div>'
    } else if (QObj.type === 'select-option') {
        var ret = '<option value="' + QObj.name + '">' + QObj.label + '</option>'
    } else if (QObj.type === 'textbox') {
        var ret = '<div class="form-textbox-label">' +
            '<input type="text" required name="' + QObj.name +
            '" pattern="' + QObj.pattern +
            '" placeholder="' + QObj.placeholder +
            '" /></div>';
    } else if (QObj.type === 'yes-no') {
        var ret = html_input({ type: 'radio', name: QObj.name, id: QObj.name + '-yes', label: 'Yes' });
        ret += html_input({ type: 'radio', name: QObj.name, id: QObj.name + '-no', label: 'No' });
    } else {
        return '<input type="checkbox" required class="input-checkbox-option" name="' + name + '" /> ';
    }
    return ret
};


var fair_price = make_question("आपके विचार से आपके द्वारा किए गए कार्य का उचित मूल्य क्या है?", html_input({ type: 'time', name: 'fair-price' }));

var hand_options = [
    html_input({ type: 'radio', name: 'hand', id: 'left', label: 'बाएं' }),
    html_input({ type: 'radio', name: 'hand', id: 'right', label: 'दाएं' }),
    html_input({ type: 'radio', name: 'hand', id: 'no-answer', label: 'चुप रहना पसंद करूंगा' })
]
var hand = make_question("क्या आप मुख्य रूप से बाएं हाथ या दाएं हाथ से काम करते हैं?", hand_options.join(''))

var assess_options = [
    html_input({ type: 'radio', name: 'assess', id: 'yes', label: 'Yes' }),
    html_input({ type: 'radio', name: 'assess', id: 'no', label: 'No' }),
    html_input({ type: 'radio', name: 'assess', id: 'confused', label: 'I was confused' })
]

var audio_options = [
    html_input({ type: 'radio', name: 'audio', id: 'computer-speaker', label: 'कंप्यूटर स्पीकर'}),
    html_input({ type: 'radio', name: 'audio', id: 'external-speaker', label: 'बाहरी वक्ता'}),
    html_input({ type: 'radio', name: 'audio', id: 'headphones', label: 'हेडफोन'}),
    html_input({ type: 'radio', name: 'audio', id: 'other', label: 'अन्य'}),
]

var listen = make_question("आपने इस अध्ययन में ऑडियो कैसे सुना?", audio_options.join(''))

var gender_options = [
    html_input({ type: 'radio', name: 'gender', id: 'female', label: 'महिला'}),
    html_input({ type: 'radio', name: 'gender', id: 'male', label: 'पुरुष'}),
    html_input({ type: 'radio', name: 'gender', id: 'other', label: 'अन्य'})
]

var gender = make_question("आपका लिंग क्या है?", gender_options.join(''))

var age = make_question("आपकी उम्र क्या है?", html_input({ type: 'time', name: 'age' }))

var language = make_question("जब आप बड़े हो रहे थे तो क्या घर में हिंदी के अलावा और कोई भाषा बोली जाती थी?", html_input({type: 'time', name: 'language'}))

var region = make_question("आप वर्तमान में भारत के किस क्षेत्र में रहते हैं?", html_input({type: 'time', name: 'region'}))

