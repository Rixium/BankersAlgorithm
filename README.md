# BankersAlgorithm
A JavaScript implementation of Banker's Algorithm

[Challenge URL](https://www.reddit.com/r/dailyprogrammer/comments/7jkfu5/20171213_challenge_344_intermediate_bankers/)
[Working Implementation](http://www.rixium.com/JavaScript/BankersAlgorithm)

## Description:

Create a program that will solve the banker’s algorithm. This algorithm stops deadlocks from happening by not allowing processes to start if they don’t have access to the resources necessary to finish. A process is allocated certain resources from the start, and there are other available resources. In order for the process to end, it has to have the maximum resources in each slot.

| Process | Allocation | Max  |	Available |
| ------ |:-----------:|:-----:| ----------:|
|        | A B C 	 | A B C | A B C    |
| P0 	 | 0 1 0 	 | 7 5 3 | 3 3 2    |
| P1 	 | 2 0 0 	 | 3 2 2 |            |
| P2 	 | 3 0 2 	 | 9 0 2 |            |
| P3 	 | 2 1 1    | 2 2 2 |            | 	
| P4 	 | 0 0 2    | 4 3 3 |            |	


Since there is 3, 3, 2 available, P1 or P3 would be able to go first. Let’s pick P1 for the example. Next, P1 will release the resources that it held, so the next available would be 5, 3, 2.

## The Challenge:

Create a program that will read a text file with the banker’s algorithm in it, and output the order that the processes should go in. An example of a text file would be like this:

    [3 3 2]

    [0 1 0 7 5 3]

    [2 0 0 3 2 2]

    [3 0 2 9 0 2]

    [2 1 1 2 2 2]

    [0 0 2 4 3 3]

And the program would print out:

    P1, P4, P3, P0, P2

## Bonus:

Have the program tell you if there is no way to complete the algorithm.
