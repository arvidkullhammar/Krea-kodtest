import json

with open('test_bingo_boards.txt') as file:
    boards_text = file.read()

boards_text = boards_text.strip().split('\n\n')


bingo_boards = []
for board_text in boards_text:
    rows = [list(map(int, row.split())) for row in board_text.strip().split('\n')]

    bingo_boards.append(rows)


json_data = json.dumps(bingo_boards)
file_path = "test_board_list.json"
with open(file_path,"w") as json_file:
    json_file.write(json_data)