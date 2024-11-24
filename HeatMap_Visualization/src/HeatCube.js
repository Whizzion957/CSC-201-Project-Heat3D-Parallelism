import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const HeatCube=({size,alpha,iterations})=>{
  const mountRef=useRef(null);
  const [cubeData,setCubeData]=useState([]);
  useEffect(()=>{
    const width=size;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer=new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z=2*width;
    //Initialize heat data grid
    const initializeHeatCube=()=>{
      const grid=Array.from({length:size},()=>
        Array.from({length:size},()=>
          Array(size).fill(0)
        )
      );
      //Set initial heat source(s)
      grid[Math.floor(size/2)][Math.floor(size/2)][Math.floor(size/2)]=1000;
      return grid;
    };
    //Run heat conduction simulation
    const computeHeatConduction=()=>{
      let grid=initializeHeatCube();
      for(let iter=0; iter<iterations; iter++) {
        const newGrid=JSON.parse(JSON.stringify(grid));
        for (let x=1; x<size-1; x++) {
          for (let y=1; y<size-1; y++) {
            for (let z=1; z<size-1; z++) {
              const heat=grid[x][y][z];
              const neighbors=(grid[x-1][y][z]+grid[x+1][y][z]+
                                grid[x][y-1][z]+grid[x][y+1][z]+
                                grid[x][y][z-1]+grid[x][y][z+1])/2;
              newGrid[x][y][z]=heat+alpha*(neighbors-heat);
            }
          }
        }
        grid=newGrid;
      }
      return grid;
    };
    const heatData=computeHeatConduction();
    setCubeData(heatData);
    //Render cube points with color gradient
    const pointsGeometry=new THREE.BufferGeometry();
    const pointsMaterial=new THREE.PointsMaterial({size:0.2,vertexColors:true});
    const positions=[];
    const colors=[];
    const color=new THREE.Color();
    heatData.forEach((plane,x)=>{
      plane.forEach((row,y)=>{
        row.forEach((heat,z)=>{
          positions.push(x-size/2,y-size/2,z-size/2);
          color.setHSL(0.7*heat,1.0,0.5);
          colors.push(color.r,color.g,color.b);
        });
      });
    });
    pointsGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    pointsGeometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    const points=new THREE.Points(pointsGeometry,pointsMaterial);
    scene.add(points);
    const animate=()=>{
      requestAnimationFrame(animate);
      points.rotation.x+=0.0004;
      points.rotation.y+=0.0004;
      renderer.render(scene,camera);
    };
    animate();
    return()=>mountRef.current.removeChild(renderer.domElement);
  },[size,alpha,iterations]);
  return<div ref={mountRef}></div>;
};
export default HeatCube;
