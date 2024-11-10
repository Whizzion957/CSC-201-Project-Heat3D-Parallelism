import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
from matplotlib.animation import FuncAnimation

alpha=0.01  #Thermal diffusivity
dx,dy,dz=0.1,0.1,0.1  # Spatial resolution in each dimension
dt=0.001  #Time step
nx,ny,nz=20,20,20  #Number of points in x,y,z
num_steps=1000  #Number of time steps for the animation

T=np.zeros((nx,ny,nz))
T[nx//2,ny//2,nz//2]=1000

fig=plt.figure(figsize=(8,6))
ax=fig.add_subplot(111,projection='3d')

def update_temperature(T):
    T_new=T.copy()
    for i in range(1,nx-1):
        for j in range(1,ny-1):
            for k in range(1,nz-1):
                T_new[i,j,k]=T[i,j,k]+alpha*dt*((T[i+1,j,k]-2*T[i,j,k]+T[i-1,j,k])/dx**2+(T[i,j+1,k]-2*T[i,j,k]+T[i,j-1,k])/dy**2+(T[i,j,k+1]-2*T[i,j,k]+T[i,j,k-1])/dz**2)
    return T_new

def animate(frame):
    global T
    T=update_temperature(T)
    ax.clear()
    slice_index=nz//2
    X,Y=np.meshgrid(range(nx),range(ny))
    Z=T[:,:,slice_index]
    #Plot the temperature distribution in the cross-section
    surf=ax.plot_surface(X,Y,Z,cmap=cm.inferno,rstride=1,cstride=1)
    ax.set_zlim(0,300)
    ax.set_title(f"Heat Diffusion at time step:{frame}")
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Temperature')
    return surf,

# Run animation
ani=FuncAnimation(fig,animate,frames=num_steps,interval=100,blit=False)
plt.show()
ani
