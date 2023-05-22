matrix = [[1,0,1,0,0,0,1], 
          [0,1,0,1,0,1,0],
          [1,0,1,0,0,0,0],
          [0,1,0,1,0,1,0],
          [1,0,1,0,0,0,1]]


def dfs(i,j,row_diff,col_diff):
    cnt = 1
    while i < len(matrix) and j < len(matrix[0]) and matrix[i][j]:
        i += row_diff
        j += col_diff
        cnt += 1

    return cnt


ans = 0
for row in range(len(matrix)):
    for col in range(len(matrix[row])):
        if matrix[row][col]:
            tl = dfs(row,col,-1,-1)
            tr = dfs(row,col,-1,1)
            bl = dfs(row,col,1,-1)
            br = dfs(row,col,1,1)
            curr_l = min(tl,tr,bl,br)
            if curr_l > ans:
                ans = curr_l
                x = row; y = col

print(x,y)
