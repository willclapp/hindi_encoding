 

let timeline = [];

// ENGLISH IRB

var preload_trial = {
    type: jsPsychPreload,
    audio: preload_exp,
    message: 'प्रयोग लोड होने तक कृपया प्रतीक्षा करें। इसमें कुछ मिनट लग सकते हैं।',
    error_message: 'प्रयोग लोड होने में विफल रहा. कृपया शोधकर्ता से संपर्क करें।',
    max_load_time: 120000 // 2 minutes
};
timeline.push(preload_trial)

let irb = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<div class ="irb"><img src="../../imgs/SUSig_2color_Stree_Stacked_Left.png" alt="Stanford University Logo" class="logo"><p id="legal"><font size="3"><br><b>गैर-चिकित्सीय मानव प्रतिभागियों की सहमति प्रपत्र और दस्तावेज़ीकरण की छूट</b><br><b>अध्ययन शीर्षक:</b> भाषा उत्पादन और समझ अध्ययन<br><b>प्रोटोकॉल निदेशक:</b> मेघन सुमनेर<br><br><b>विवरण:</b> हम आपको भाषा उत्पादन और उसके आंकलन पर एक शोध के अध्ययन में भाग लेने के लिए आमंत्रित करते हैं। आपका प्रयोगकर्ता आपसे भाषा पर चर्चा करने के लिए कहेगा जैसे वाक्य या शब्द पढ़ना, चित्रों का नामकरण करना या दृश्यों का वर्णन करना, अपने स्वयं के वाक्य बनाना, या भाषा के एक सरल खेल में भाग लेना।<br><br><b>जोखिम और लाभ:</b> इस अध्ययन में शामिल होने पर आपको किसी भी प्रकार का कोई जोखिम या लाभ नहीं है।<br><br><b>भुगतान:</b> आपकी भागीदारी के लिए आपको सहमत दर पर भुगतान किया जाएगा।<br><br><b>समय की भागीदारी:</b> इस प्रयोग में आपकी भागीदारी में एक घंटे से भी कम समय लगेगा।<br><br><b>विषय के अधिकार:</b> यदि आपने इस फॉर्म को पढ़ लिया है और इस प्रयोग में भाग लेने का फैसला किया है, तो कृपया समझें कि आपकी भागीदारी स्वैच्छिक है और आपको किसी भी समय बिना किसी दंड के भागीदारी या लाभों के नुकसान जिससे आप हकदार हैं, अपनी सहमति वापस लेने या बंद करने का अधिकार है। आपको विशेष कार्यों को करने से मना करने का अधिकार है। अध्ययन के परिणामस्वरूप, सभी प्रकाशित और लिखित तथ्य में आपकी व्यक्तिगत गोपनीयता को बनाए रखा जाएगा। आपके रिकॉर्ड के लिए यह फॉर्म आप प्रिंट कर सकते हैं |<br><br><b>संपर्क जानकारी:</b> यदि इस शोध अध्ययन या इसकी प्रक्रियाओं,जोखिम और लाभ के बारे में आपका कोई प्रश्न, चिंता या शिकायत है तो आपको प्रोटोकॉल निदेशक मेघन सुमनेर से (650) 725-9336 पर संपर्क करना चाहिए।<br><br>यदि आप इस अध्ययन के संचालन से संतुष्ट नहीं हैं या आपको अनुसंधान के भागीदार के रूप में आपके अधिकारों के बारे में कोई चिंता, शिकायत या सामान्य प्रश्न हैं तो कृपया स्टैनफोर्ड इंस्टीट्यूशनल रिव्यू बोर्ड (आईआरबी) अनुसंधान दल के कुछ स्वतंत्र लोगों से बात करने के लिए अनुसंधान दल (650) 723-2480 पर या 1-866-680-2906 पर टोल फ्री से संपर्क करें। आप स्टैनफोर्ड आईआरबी, स्टैनफोर्ड यूनिवर्सिटी, 3000 एल कैमिनो रियल, फाइव पालो ऑल्टो स्क्वायर, चौथी मंजिल, पालो ऑल्टो, सीए 94306 यूएसए को भी लिख सकते|<br><br><b>दस्तावेज़ीकरण की छूट:</b> यदि आप भाग लेने के लिए सहमत हैं, तो कृपया अध्ययन कार्यों के लिए आगे बढ़ें।<br><br></font></p></div>',
    choices: ['Continue']
};

timeline.push(irb);

let general_instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div class="gen_ins"><p>इस प्रयोग में, आप रिकॉर्डिंग सुनेंगे और उनके बारे में निर्णय लेंगे। <br><br>महत्वपूर्ण: कृपया इस कार्य को केवल तभी स्वीकार करें जब आप हेडफ़ोन के माध्यम से सुन रहे हों और शांत वातावरण में काम कर रहे हों।<br><br>जारी रखने के लिए स्पेस बार दबाएं।</p></div>`,
    choices: [' ']
};

timeline.push(general_instructions);


let instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        if (button_order == 'NEW_OLD') {
            return '<div class="spec_ins"><p>इस प्रयोग में, आपको एक-एक करके शब्दों की श्रंखला की ध्वनि रिकॉर्डिंग सुनाई जाएंगी, कभी-कभी आप पहली बार यह शब्द सुन रहे होंगे और कभी-कभी आप इसे दूसरी बार सुन रहे होंगे। आपका काम यह तय करना है कि आपने शब्द पहले ही सुना है या नहीं। यदि आपको लगता है कि आपने पहली बार शब्द सुना है, तो आपको \'D\' कुंजी (की) दबाकर यह संकेत करना चाहिए कि यह नया है। यदि आपको लगता है कि आपने प्रयोग में शब्द पहले ही सुन लिया है, तो आपको \'K\' कुंजी (की) दबाकर संकेत करना चाहिए कि यह पुराना है।<br><br>ध्यान से सुनना सुनिश्चित करें और जितना हो सके उतनी जल्दी और सटीक रूप से आगे बढ़ें। आपको 4 सेकंड के भीतर जवाब देना होगा नहीं तोअगला शब्द अपने आप बज जाएगा। मुख्य प्रयोग से पहले, एक संक्षिप्त अभ्यास चरण होगा जहां आपको अपने उत्तरों पर प्रतिक्रिया प्राप्त होगी।<br><br>जब आप अभ्यास का दौर शुरू करने के लिए तैयार हों, तो स्पेस बार दबाएं।</p></div>';
        } else {
            return '<div class="spec_ins"><p>इस प्रयोग में, आपको एक-एक करके शब्दों की श्रंखला की ध्वनि रिकॉर्डिंग सुनाई जाएंगी, कभी-कभी आप पहली बार यह शब्द सुन रहे होंगे और कभी-कभी आप इसे दूसरी बार सुन रहे होंगे। आपका काम यह तय करना है कि आपने शब्द पहले ही सुना है या नहीं। यदि आपको लगता है कि आपने पहली बार शब्द सुना है, तो आपको \'K\' कुंजी (की) दबाकर यह संकेत करना चाहिए कि यह नया है। यदि आपको लगता है कि आपने प्रयोग में शब्द पहले ही सुन लिया है, तो आपको \'D\' कुंजी (की) दबाकर संकेत करना चाहिए कि यह पुराना है।<br><br>ध्यान से सुनना सुनिश्चित करें और जितना हो सके उतनी जल्दी और सटीक रूप से आगे बढ़ें। आपको 4 सेकंड के भीतर जवाब देना होगा नहीं तोअगला शब्द अपने आप बज जाएगा। मुख्य प्रयोग से पहले, एक संक्षिप्त अभ्यास चरण होगा जहां आपको अपने उत्तरों पर प्रतिक्रिया प्राप्त होगी।<br><br>जब आप अभ्यास का दौर शुरू करने के लिए तैयार हों, तो स्पेस बार दबाएं।</p></div>';
        }
    },
    choices: [' ']
};

timeline.push(instructions);

for (i = 0; i < num_practice * 2; i++) {
    timeline.push(practice_audio_objects[i]);
    timeline.push(practice_response_objects[i]);
    timeline.push(feedback_trial);
}


let end_practice = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div class="spec_ins"><p>अभ्यास का दौर अब पूरा हो गया है, और शेष प्रयोग के लिए, आपको अपने जवाबों पर प्रतिक्रिया प्राप्त नहीं होगी।<br><br>जब आप आगे बढ़ने के लिए तैयार हों, तो स्पेस बार दबाएं।</p></div>`,
    choices: [' ']
};

timeline.push(end_practice);

for (i = 0; i < num_memload * 2; i++) {
    timeline.push(memload_audio_objects[i]);
    timeline.push(memload_response_objects[i]);
    timeline.push(inter_trial);
}

for (i = 0; i < num_exp * 2; i++) {
    timeline.push(exp_audio_objects[i]);
    timeline.push(exp_response_objects[i]);
    timeline.push(inter_trial);
}

let social_instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div class="pre-test-container"><p>अच्छा काम! आपने प्रयोग समाप्त कर दिया।<br><br>हमारे परिणामों की व्याख्या करने में हमारी सहायता करने के लिए, आपके बारे में कुछ और सीखना उपयोगी होगा। कृपया अगले प्रश्नों के उत्तर दें।<br><br>जारी रखने के लिए स्पेस बार दबाएं।</div>',
    choices: [' '],
    post_trial_gap: 250
}

timeline.push(social_instructions)

var survey = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p><br>कृपया अग्रांकित प्रश्नों के उत्तर दें।</p><br>',
    html: '<ol class="input-wrapper">' +
        hand +
        gender +
        age +
        region +
        language +
        english + 
        listen +
        fair_price +
        '</ol>'
};

timeline.push(survey)

var jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function(data) {
        var data_obj = {
            "trials" : data['trials'],
            "catch_trials" : {},
            "system" : {},
            "condition" : "",
            "subject_information" : {},
            "time_in_minutes" : {}
        }
        console.log(data_obj)
        setTimeout(function() {turk.submit(data_obj);}, 1000);
    }
  });

jsPsych.run(timeline)