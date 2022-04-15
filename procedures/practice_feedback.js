let feedback_trial = {
    type: 'html-keyboard-response',
    trial_duration: 3000, 
    response_ends_trial: false,
    stimulus: function() {
        var last_trial_case = jsPsych.data.get().last(1).values()[0].case;
        // console.log(last_trial_case);
        if(last_trial_case == "HIT"){
            return '<div class="right-container"><p class="right-text">सही!</p></div>'; 
        } else if (last_trial_case == "CORRECT_REJECTION") {    
            return '<div class="right-container"><p class="right-text">अच्छा काम!</p></div>'; 
        } else if (last_trial_case == "FALSE_ALARM") {
            return '<div class="wrong-container"><p class="wrong-text">नहीं, वह शब्द वास्तव में नया था।</p></div>';
        } else if (last_trial_case == "NO_RESPONSE") {
            return '<div class="wrong-container"><p class="wrong-text">कृपया 4 सेकंड के भीतर प्रतिक्रिया दें।</p></div>';
        } else {
            return '<div class="wrong-container"><p class="wrong-text">गलत। वह शब्द पुराना था।</p></div>';
        }
    }
}


let inter_trial = {
    type: 'html-keyboard-response',
    trial_duration: 1000,
    response_ends_trial: false,
    stimulus: function() {
        if (button_order == "NEW_OLD") {
                return '<div class="big-container"><div class="yes-no"><div class="between-container"><p>नया</p><p>Press D</p></div><div class="between-container"><p>पुराना</p><p>Press K</p></div></div></div>';
            } else {
                return '<div class="big-container"><div class="yes-no"><div class="between-container"><p>पुराना</p><p>Press D</p></div><div class="between-container"><p>नया</p><p>Press K</p></div></div></div>';
            }
        }
}
