#towers = [1,4,3,2]
#towers = [5,7,9,4,11]
towers = [11,4,9,7,5]
print(sum(towers)//5)
ascending_cost = 0
descending_cost = 0

for i in range(1,len(towers)):
    ascending_cost += towers[i] - towers[i-1] + 1


print(ascending_cost)
