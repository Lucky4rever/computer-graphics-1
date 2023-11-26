import CustomMath from "@/utils/custom-math";

class MatrixRotation {
  private matrix: number[];

  constructor(matrix: number[]) {
    this.matrix = matrix;
  }

  rotateMatrix(angleInRadians: number): number[] {
    let cos = Math.cos(angleInRadians);
    let sin = Math.sin(angleInRadians);

    // console.log(cos, sin);

    for (let i = 0; i < this.matrix.length; i += 3) {
      let x = this.matrix[i];
      let y = this.matrix[i + 1];

      this.matrix[i] = x * cos - y * sin;
      this.matrix[i + 1] = x * sin + y * cos;
    }

    return this.matrix;
  }
}

export default MatrixRotation;
