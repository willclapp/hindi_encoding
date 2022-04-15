import csv
from os import listdir

def check_files(input_csv, ident_tokens):
    # First, create list of all files that should be there
    # by reading through the CSV
    speakers = []
    exp_file_list = []
    with open(input_csv) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        for line in csv_reader:
            if line[1] == 'word':
                for i in range(len(line) - 2):
                    speakers.append(line[i + 2])
            else:
                for i in range(len(line) - 2):
                    if ident_tokens:
                        speaker_name = speakers[i]
                    else:
                        speaker_name = speakers[i][:-2]
                    filepath = line[1] + "_" + line[i + 2] + "_" + speaker_name + ".wav"
                    
                    exp_file_list.append(filepath)

    
    # Then, create a list of files that are in the directories
    u_speakers = []
    if ident_tokens == False:
        for i in range(len(speakers)):
            speakers[i] = speakers[i][:-2]
            if speakers[i] not in u_speakers:
                u_speakers.append(speakers[i])
    else:
        u_speakers = speakers
    
    actual_file_list = []
    for i in range(len(u_speakers)):
        path = "../audio/" + u_speakers[i] + "/"
        files = listdir(path)
        for file in files:
            actual_file_list.append(file)
    
    # then compare the two
    counter = 0
    for file in exp_file_list:
        if file not in actual_file_list:
            print("The file " + file + " was expected but not found!")
        else:
            counter += 1;
    if counter == len(exp_file_list):
        print("All files were found!")


input_file = "./best_recordings_1.csv"
check_files(input_file, True)

