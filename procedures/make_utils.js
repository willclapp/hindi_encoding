// create an array of 0s of the specified length
function createArray(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(0);
    }
    return arr;
}

// Get random number between 0 and 99
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomJitter(max) {
    return Math.floor(Math.random() * max) - (max / 2);
}

// shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
} 

// Get an array of the ids for the current block
function getIds(word_array, start, stop) {
    let out_arr = [];
    for (let i = start; i < stop; i++) {
        out_arr.push(word_array[i].id);
    }
    return out_arr;
}

// Create a list of short lags of the specified length
// Proportions: 
// 50% 2
// 35% 4
// 15% 6
function createPracticeLagList(num) {
    let lag_list = [];
    for (let i = 0; i < num; i++) {
        current_lag = 0;
        let rand = getRandomInt(100);
        if (rand < 50) {
            lag_list.push(2);
        } else if (rand < 85) {
            lag_list.push(4);
        } else {
            lag_list.push(6);
        }
    }
    return lag_list
}

// Create a list of short lags of the specified length
// Proportions: 
// 30% 2
// 30% 4
// 20% 6
// 20% 8
function createMemloadLagList(num) {
    let lag_list = [];
    for (let i = 0; i < num; i++) {
        current_lag = 0;
        let rand = getRandomInt(100);
        if (rand < 25) {
            lag_list.push(2);
        } else if (rand < 50) {
            lag_list.push(4 + getRandomJitter(2));
        } else if (rand < 75) {
            lag_list.push(6 + getRandomJitter(2));
        } else {
            lag_list.push(8 + getRandomJitter(2));
        }
    }
    return lag_list
}

// Create a list of long lags of the specified length
// Proportions 2, 4, 8, 12: 
// 14% 2 14
// 10% 4  24
// 8% 6   32
// 8% 8  
// 5% 12  55
// 5% 16  50
// 10% 24 60
// 10% 32 70
// 10% 40   80
// 10% 48  90
// 5% 56  95
// 5% 64  100

function createExpLagList(num) {
    let lag_list = [];
    for (let i = 0; i < num; i++) {
        current_lag = 0;
        let rand = getRandomInt(100);
        if (rand < 15) {
            lag_list.push(2);
        } else if (rand < 25) {
            lag_list.push(4 + getRandomJitter(2));
        } else if (rand < 35) {
            lag_list.push(6 + getRandomJitter(2));
        } else if (rand < 45) {
            lag_list.push(8 + getRandomJitter(2));
        } else if (rand < 55) {
            lag_list.push(12 + getRandomJitter(4));
        } else if (rand < 63) {
            lag_list.push(16 + getRandomJitter(4));
        } else if (rand < 71) {
            lag_list.push(24 + getRandomJitter(8));
        } else if (rand < 78) {
            lag_list.push(32 + getRandomJitter(8));
        } else if (rand < 85) {
            lag_list.push(40 + getRandomJitter(8));
        } else if (rand < 90) {
            lag_list.push(48 + getRandomJitter(8));
        } else if (rand < 95) {
            lag_list.push(56 + getRandomJitter(8));
        } else {
            lag_list.push(64 + getRandomJitter(4));
        }
    }
    return lag_list
}

function findClosest(order_array, ideal_slot) {
    let down = ideal_slot;
    let up = ideal_slot;
    let cont_down = true;
    let cont_up = true;
    while (cont_down) {
        down--;
        if (order_array[down] < 1 || down == 0) {
            cont_down = false;
        }
    }
    while (cont_up) {
        up++;
        if (order_array[up] < 1 || up == order_array.length) {
            cont_up = false;
        }
    }
    if (down == 0) {
        return up;
    } else if (up == order_array.length) {
        return down;
    } else {
        let up_diff = up - ideal_slot;
        let down_diff = ideal_slot - down;
        if (down < up) {
            return down;
        } else {
            return up;
        }
    }
}

function findLast(order_array) {
    let cont_down = true;
    let slot = order_array.length;
    while (cont_down) {
        slot--;
        if (order_array[slot] < 1) {
            cont_down = false;
        }
    }
    return slot;
}

function assignTrials(order_arr, lag_arr, id_arr) {
    for (let i = 0; i < id_arr.length; i++) {
        let cont = true; 
        let j = i;
        let lag = lag_arr[i];
        while (cont) {
            // Place id in first empty slot
            if (order_arr[j] < 1) {
                order_arr[j] = id_arr[i];
                // Place second in closest available slot
                // first check that the slot exists
                let ideal = j + lag;
                if ((ideal) < order_arr.length) {
                    if (order_arr[ideal] < 1) {
                        order_arr[ideal] = id_arr[i];
                    } else {
                        order_arr[findClosest(order_arr, ideal)] = id_arr[i];
                    }
                } else {
                    order_arr[findLast(order_arr)] = id_arr[i];
                }
                cont = false;
            } else {
                j++;
            }
        }
    }
    return order_arr;
}

function checkDistribution(order_arr) {
    let checked = [];
    let lags = []
    for (let i = 0; i < order_arr.length; i++) {
        if (!checked.includes(order_arr[i])) {
            checked.push(order_arr[i]);
            for (let j = i + 1; j < order_arr.length; j++) {
                if (order_arr[j] == order_arr[i]) {
                    let lag = j - i;
                    lags.push(lag);
                }
            }
        } 
    }
    lags.sort(function(a, b) {
        return a - b;
      });
}

function generateTalkerOrder(words, talker_list) {
    let out_arr = [];
    if (talker_list.length > 1) {
        let possibilities = [];
        for (let i = 0; i < talker_list.length; i++) {
            let str = "Same_" + talker_list[i];
            possibilities.push(str);
            str = "Diff_" + talker_list[i];
            possibilities.push(str);
        }
        let num_per_case = Math.ceil(words.length / possibilities.length);
        for (let i = 0; i < num_per_case; i++) {
            shuffle(possibilities);
            for (let j = 0; j < possibilities.length; j++) {
                if (out_arr.length < words.length) {
                    out_arr.push(possibilities[j]);
                }
            }
        }
    } else {
        for (let i = 0; i < words.length; i++) {
            out_arr.push("Same_" + talker_list[0]);
        }
    }
    return out_arr;
}

function generateBlankTrials(audio_array, response_array, quantity, audio_template, response_template, audio_data_template, response_data_template) {
    for (let i = 0; i < quantity * 2; i++) {
        // for audio
        let audio_copy = {};
        for (let key in audio_template) {
            audio_copy[key] = audio_template[key];
        }  
        let audio_data_copy = {};
        for (let key in audio_data_template) {
            audio_data_copy[key] = audio_data_template[key];
        }
        audio_data_copy.Order= i + 1;
        audio_copy.data = audio_data_copy;
        audio_array.push(audio_copy);

        // for response
        let response_copy = {};
        for (let key in response_template) {
            response_copy[key] = response_template[key];
        }
        let response_data_copy = {};
        for (let key in response_data_template) {
            response_data_copy[key] = response_data_template[key];
        }
        response_data_copy.Order = i + 1;
        response_copy.data = response_data_copy;
        response_array.push(response_copy);
    }
}


function generateDifferentTalkers(talker_list, num_reps) {
    let loops = Math.ceil(num_reps / talker_list.length / 2) + 1;
    let output_list = [];
    for (let i = 0; i < loops; i++) {
        shuffle(talker_list);
        for (let j = 0; j < talker_list.length; j++) {
            output_list.push(talker_list[j]);
        }
    }
    return output_list;
}

    
function generateTrials(trial_ord, talker_ord, audio_trials, response_trials, phase) {
    new_old_prompt = '<div class="big-container"><div class="yes-no"><div class="option-container"><p>नया</p><p>Press D</p></div><div class="option-container"><p>पुराना</p><p>Press K</p></div></div></div>';
    old_new_prompt = '<div class="big-container"><div class="yes-no"><div class="option-container"><p>पुराना</p><p>Press D</p></div><div class="option-container"><p>नया</p><p>Press K</p></div></div></div>';
    let voice_pool = generateDifferentTalkers(talker_ids, talker_ord.length);

    let unique_index = -1;
    for (let i = 0; i < trial_ord.length; i++) {
        if (audio_trials[i].data.Phase == 'UNKNOWN') {
            unique_index += 1;
            let indices = [i, -1];
            // identify index of repetition
            for (let j = i + 1; j < trial_ord.length; j++) {
                if (trial_ord[j] == trial_ord[i]) {
                    indices[1] = j;
                    break;
                }
            }
            // add info to new then old trial
            for (let j = 0; j < indices.length; j++) {
                let index = indices[j];
                audio_trials[index].data.Phase = phase + "_audio";
                response_trials[index].data.Phase = phase;
                audio_trials[index].data.ID = trial_ord[index];
                response_trials[index].data.ID = trial_ord[index];
                audio_trials[index].data.Buttons = button_order;
                response_trials[index].data.Buttons = button_order;
                audio_trials[index].data.num_voices = talker_ids.length;
                response_trials[index].data.num_voices = talker_ids.length;
                audio_trials[index].data.token_repeated = identical_tokens;
                response_trials[index].data.token_repeated = identical_tokens;
                audio_trials[index].data.talker_set = talker_ids;
                response_trials[index].data.talker_set = talker_ids;

                //identify the word
                for (let k = 0; k < word_ids.length; k++) {
                    if (word_ids[k].id == trial_ord[index]) {
                        audio_trials[index].data.Word = word_ids[k].word;
                        response_trials[index].data.Word = word_ids[k].word;
                        break;
                    }
                }
                // insert some html
                if (button_order == 'NEW_OLD') {
                    audio_trials[index].prompt = new_old_prompt;
                    response_trials[index].stimulus = new_old_prompt;
                } else {
                    audio_trials[index].prompt = old_new_prompt;
                    response_trials[index].stimulus = old_new_prompt;
                }
                // identify the presentation, talker, and stimulus
                let talker_info = talker_ord[unique_index];      
                if (talker_info.split('_').shift() == 'Same') {
                    audio_trials[index].data.Same_Talker = true;
                    response_trials[index].data.Same_Talker = true;
                }
                let og_talker = talker_info.split('_').pop();
                if (j == 0) {
                    audio_trials[index].data.Presentation = 'NEW';
                    response_trials[index].data.Presentation = 'NEW';
                    audio_trials[index].data.Talker = og_talker;
                    response_trials[index].data.Talker = og_talker;
                } else {
                    audio_trials[index].data.Presentation = 'OLD';
                    response_trials[index].data.Presentation = 'OLD';
                    if (audio_trials[index].data.Same_Talker) {
                        audio_trials[index].data.Talker = og_talker;
                        response_trials[index].data.Talker = og_talker;
                    } else {
                        let diff_talker = '';
                        for (let k = 0; k < voice_pool.length; k++) {
                            if (voice_pool[k] != og_talker) {
                                diff_talker = voice_pool[k];
                                voice_pool.splice(k, 1);
                                audio_trials[index].data.Talker = diff_talker;
                                response_trials[index].data.Talker = diff_talker;
                                break;
                            }
                        }
                    }
                }
                // stitch together the talker key
                let talker_key = audio_trials[index].data.Talker;
                // if (j == 1 && audio_trials[index].data.token_repeated == false) {
                //     talker_key += "_2";
                // } else {
                //     talker_key += "_1";
                // }
                // locate correct recording number
                let talker_index = header_key.indexOf(talker_key);
                for (let k = 0; k < word_ids.length; k++) {
                    if (word_ids[k].id == audio_trials[index].data.ID) {
                        audio_trials[index].data.Recording = word_ids[k].list[talker_index];
                        response_trials[index].data.Recording = word_ids[k].list[talker_index];
                        break;
                    }
                }
                // stitch together audio path
                audio_trials[index].stimulus = "../../audio/" + audio_trials[index].data.Talker + "/" + audio_trials[index].data.Word + "_" + audio_trials[index].data.Recording + "_" + audio_trials[index].data.Talker + ".wav";
            }          
        }
    }
}