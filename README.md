# Solving Heat Conduction Problem with DOALL Parallelism using OpenMP #

### Heat 3D Algorithm ###
The heat 3D algorithm, often used in scientific and engineering applications, solves the heat equation for a three-
dimensional object. The heat equation is a partial differential equation PDE that describes how heat diffuses
through a medium over time. To understand this algorithm, letʼs break down the concept step-by-step.
___
### Installing OpenMP ###
Open MPI uses a traditional configure script paired with make to build. Typical installs can be of the pattern:
```
shell$ tar xf openmpi-<version>.tar.bz2
shell$ cd openmpi-<version>
shell$ ./configure --prefix=<path> [...options...] 2>&1 | tee config.out

# Use an integer value of N for parallel builds
shell$ make [-j N] all 2>&1 | tee make.out

# ...ots of output...

# Depending on the <prefix> chosen above, you may need root access
# for the following:

shell$ make install 2>&1 | tee install.out

# ...lots of output...
# Note that VPATH builds are fully supported. For example:

shell$ tar xf openmpi-<version>.tar.bz2
shell$ cd openmpi-<version>
shell$ mkdir build
shell$ cd build
shell$ ../configure --prefix=<path> 2>&1 | tee config.out

# ...etc.
# The above patterns can be used in many environments.
```
___
### For compiling and executing ### 
in the working directory:
```
cd DOALL-parallelism-main
gcc -fopenmp -o heat3d heat3d.c -lnuma -lm -o heat3d
./heat3d -commands
`
#or, just:

make
``` 
Commands for running the problem by different methods used:

| Command | Method                    |
|---------|---------------------------|
| `-s`    | Sequentially               |
| `-d`    | by DOALL Parallelism          |
| `-t`    | by Tiling/Caching             |
| `-w`    | by Wavefront Parallelism      |
| `-dd`   | by Domain Decomposition       |
| `-td`   | by Temporal Decomposition     |
| `-n`    | by NUMA-Aware Parallelism     |

___
