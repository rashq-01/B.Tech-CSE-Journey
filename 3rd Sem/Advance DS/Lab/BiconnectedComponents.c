#include<stdio.h>
#include<stdlib.h>
#define MAX 20

typedef struct{
    int u,v;

}Edge;

int V,E;
int timeDFS = 0;
int disc[MAX], low[MAX],parent[MAX];
int stackTop = -1;
Edge stack[MAX * MAX];
int visited[MAX];

void pushEdge(int u, int v){
    stack[++stackTop].u = u;
    stack[stackTop].v = v;
}