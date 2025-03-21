import random

# 导入random模块，用于生成随机数

# 假设这是周杰伦的歌词库（简化版）
lyrics = [
    "故事的小黄花", "从出生那年就飘着",
    "童年的荡秋千", "随记忆一直晃到现在",
    "雨下整夜", "我的爱溢出就像雨水"
]

# 定义一个列表lyrics，存储周杰伦的部分歌词

# 构建马尔可夫链模型（当前词 -> 可能的下一个词）
markov_chain = {}
for i in range(len(lyrics)-1):
    current = lyrics[i]
    next_word = lyrics[i+1]
    if current not in markov_chain:
        markov_chain[current] = []
    markov_chain[current].append(next_word)

# 初始化一个空字典markov_chain，用于存储马尔可夫链模型
# 遍历歌词列表lyrics，构建当前词到下一个词的映射关系
# current变量存储当前词
# next_word变量存储下一个词
# 如果当前词不在markov_chain字典中，则添加当前词作为键，并初始化一个空列表作为值
# 将下一个词添加到当前词对应的列表中

# 生成新歌词（从随机词开始，按概率跳转）
current_word = random.choice(lyrics)
song = [current_word]
for _ in range(4):  # 生成4个词
    if current_word in markov_chain:
        next_word = random.choice(markov_chain[current_word])
        song.append(next_word)
        current_word = next_word
    else:
        break

# 从lyrics列表中随机选择一个词作为起始词，存储在current_word变量中
# 初始化一个列表song，用于存储生成的歌词，初始包含current_word
# 使用一个for循环生成4个词
# 如果当前词在markov_chain字典中，则从对应的列表中随机选择一个词作为下一个词
# 将下一个词添加到song列表中，并更新current_word为下一个词
# 如果当前词不在markov_chain字典中，则跳出循环

print(' '.join(song))

# 使用' '.join()方法将song列表中的词连接成一个字符串，并用空格分隔
# 打印生成的歌词