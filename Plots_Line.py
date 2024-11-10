import matplotlib.pyplot as plt

threads=[3,4,8,16,32,64,80]
seq_times=[14.9902,14.3205,13.8416,14.5734,13.9547,13.7679,13.5313]
doall_times=[6.7599,5.5191,3.5255,3.2254,2.9245,2.6731,2.5979]
til_times=[6.8024,5.9760,4.0579,3.2865,3.0792,2.7694,2.7449]
wav_times=[11.1542,11.6706,10.5429,11.1101,23.1167,42.6268,52.1279]
numa_times=[15.4742,15.4536,15.3772,16.3185,15.9536,15.6342,16.6264]

methods=['Seq','Doall','Tile','Wave','NUMA']
times_by_method=[seq_times,doall_times,til_times,wav_times,numa_times]

#Plotting Time vs Parallelism Methods for different thread values
plt.figure(figsize=(14,6))
for i,thread in enumerate(threads):
    times_for_thread=[method[i] for method in times_by_method]
    plt.plot(methods,times_for_thread,label=f'Threads={thread}',marker='o')
plt.title("Time vs Parallelism Methods for Different Thread Values")
plt.xlabel("Parallelism Methods")
plt.ylabel("Time (seconds)")
plt.legend(title="Thread Count")
plt.grid(True)

# Plotting Time vs Threads for each parallelism method
plt.figure(figsize=(14,6))
for times, method in zip(times_by_method, methods):
    plt.plot(threads,times,label=f'{method}',marker='o')
plt.title("Time vs Threads for Different Parallelism Methods")
plt.xlabel("Threads")
plt.ylabel("Time(seconds)")
plt.legend(title="Parallelism Method")
plt.grid(True)
plt.show()
