import csv
import json
import ast

def csv_to_json(csv_file, json_file):
    # CSV 파일을 읽어와서 처리
    with open(csv_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        data = []
        for row in reader:
            # 각 행의 데이터를 원하는 JSON 형식으로 변환
            # print(row['character'], row['korean'], row['meaning'],)
            arr = ast.literal_eval(row['meaning'])

            if len(arr[0][0]) == 1:
                mean1 = arr[0][0][0]
            else:
                mean1 = ",".join(arr[0][0])
            entry = {
                "character": row['character'], 
                "korean": row['korean'], 
                "meaning": mean1,
                }
            
            if len(arr) > 1:
                korean2 = arr[1][1][0]
                if len(arr[1][1]) == 1:
                    mean2 = arr[1][0][0]
                else:
                    mean2 = ",".join(arr[1][0])
                entry = {
                    "character": row['character'], 
                    "korean": row['korean'], 
                    "meaning": mean1, 
                    "korean2": korean2, 
                    "meaning2": mean2,
                    }
                
            if len(arr) > 2:
                korean3 = arr[2][1][0]
                if len(arr[2][1]) == 1:
                    mean3 = arr[2][0][0]
                else:
                    mean3 = ",".join(arr[2][0])
                entry = {
                    "character": row['character'], 
                    "korean": row['korean'], 
                    "meaning": mean1, 
                    "korean2": korean2, 
                    "meaning2": mean2,
                    "korean3": korean3, 
                    "meaning3": mean3,
                    }

            # 추가 필드가 있는 경우 처리
            # if 'korean2' in row and 'meaning2' in row:
            #     entry['korean2'] = row['korean2']
            #     entry['meaning2'] = row['meaning2']
            # print(entry)
            data.append(entry)
    
    # JSON 파일로 저장
    # with open(json_file, mode='w', encoding='utf-8') as f:
    #     json.dump(data, f, ensure_ascii=False, indent=2)
    # JSON 파일로 저장
    with open(json_file, mode='w', encoding='utf-8') as f:
        json_str = ',\n'.join(json.dumps(item, ensure_ascii=False) for item in data)
        f.write('[\n')
        f.write(json_str)
        f.write('\n]\n')

# 예제 실행
csv_file = 'data/8.csv'  # 여기에 자신의 CSV 파일 경로를 넣으세요
json_file = '8.json'  # 저장할 JSON 파일 경로

csv_to_json(csv_file, json_file)
