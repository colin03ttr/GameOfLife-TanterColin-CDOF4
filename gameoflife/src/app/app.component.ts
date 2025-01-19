import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Game of Life';
  rows = 20; // Number of rows in the grid
  cols = 20; // Number of columns in the grid
  grid: boolean[][] = [];
  intervalId: any = null; // To store the interval reference

  constructor() {
    this.initializeGrid();
  }

  initializeGrid(): void {
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
  }

  toggleCell(row: number, col: number): void {
    this.grid[row][col] = !this.grid[row][col];
  }

  nextGeneration(): void {
    const newGrid = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const liveNeighbors = this.countLiveNeighbors(row, col);
        if (this.grid[row][col]) {
          newGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3;
        } else {
          newGrid[row][col] = liveNeighbors === 3;
        }
      }
    }

    this.grid = newGrid;
  }

  countLiveNeighbors(row: number, col: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
          count += this.grid[newRow][newCol] ? 1 : 0;
        }
      }
    }
    return count;
  }

  startAutoGeneration(): void {
    // If an interval is already running, do nothing
    if (this.intervalId) return;

    // Start a new interval to generate every 0.5 seconds
    this.intervalId = setInterval(() => {
      this.nextGeneration();
    }, 500);
  }

  stopAutoGeneration(): void {
    // Clear the interval and reset the intervalId
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
