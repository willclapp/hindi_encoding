import csv
def make_obj(input_csv, output):
    output_string = "let header_key = [\""
    col = ": "
    com = ", "

    with open(input_csv) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        for line in csv_reader:
            if (line[1] == "word"):
                for i in range(len(line) - 2):
                    output_string += line[i + 2] + "\", \""
                output_string = output_string[:-3] + "]\n\nlet word_ids = [\n"
            else:
                output_string += "\t{id: " + line[0] + ", word: " + "\"" + line[1] + "\", list: ["
                for i in range(len(line) - 2):
                    output_string += line[i + 2] + ", "
                output_string = output_string[:-2] + "]},\n"

    output_string = output_string[:-2] + "\n]"

    print(output_string)

    out_file = open(output, 'w')
    out_file.write(output_string)
    out_file.close()
    print("file written")

csv_path = "/Users/willclapp/Desktop/Hindi/Experiments/csvs/best_recordings_1.csv"
output_path = "/Users/willclapp/Desktop/Hindi/Experiments/csvs/word_ids_1.js"
make_obj(csv_path, output_path)