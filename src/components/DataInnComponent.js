import { useState, useEffect } from 'react';
import styles from '../app/MatrixInput.module.css'

const MatrizInput = () => {
    const initialMatriz = [['']];
    const [matriz, setMatriz] = useState(initialMatriz);
    const [rotatedMatriz, setRotatedMatriz] = useState([['']]);

    useEffect(() => {
        rotateMatriz();
    }, [matriz]);

    const handleInputChange = (e, row, col) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            const newMatriz = matriz.map((r, rowIndex) => {
                if (rowIndex === row) {
                    return r.map((c, colIndex) => {
                        if (colIndex === col) {
                            return value;
                        }
                        return c;
                    });
                }
                return r;
            });
            setMatriz(newMatriz);
        }
    };

    const addRowAndColumn = () => {
        const newMatriz = matriz.map(row => [...row, '']);
        newMatriz.push(new Array(matriz[0].length + 1).fill(''));
        setMatriz(newMatriz);
    };

    const removeRowAndColumn = () => {
        if (matriz.length > 1 && matriz[0].length > 1) {
            const newMatriz = matriz.slice(0, -1).map(row => row.slice(0, -1));
            setMatriz(newMatriz);
        }
    };

    const rotateMatriz = () => {
        if (matriz.length !== matriz[0].length) {
            alert("La matriz debe ser cuadrada para rotarla.");
            return;
        }
        /*if (!validateMatriz()) {
            alert("Todos los campos deben tener un valor.");
            return;
        }*/

        const n = matriz.length;
        const rotatedMatriz = [];
        for (let j = n - 1; j >= 0; j--) {
            let newRow = [];
            for (let i = 0; i < n; i++) {
                newRow.push(matriz[i][j]);
            }
            rotatedMatriz.push(newRow);
        }

        setRotatedMatriz(rotatedMatriz);
    };

    const resetMatriz = () => {
        setMatriz(initialMatriz);
        setRotatedMatriz([['']]);
    };

    const validateMatriz = () => {
        return matriz.every(row => row.every(cell => cell.trim() !== ''));
    };

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={addRowAndColumn}>+</button>
            <button className={styles.button} onClick={removeRowAndColumn}>-</button>
            <button className={styles.button} onClick={resetMatriz}>Reset</button>
            <h3>Matriz Original:</h3>
            <div className={styles.matrizContainer}>
                {matriz.map((row, rowIndex) => (
                    <div className={styles.row} key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <input
                                className={styles.cell}
                                key={colIndex}
                                type="text"
                                value={cell}
                                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            {/*<button className={styles.button} onClick={rotateMatriz}>Rotar 90° Anti-horario</button>*/}
            {rotatedMatriz.length > 0 && (
                <div>
                    <h3>Matriz Rotada:</h3>
                    <div className={styles.matrizContainer}>
                        {rotatedMatriz.map((row, rowIndex) => (
                            <div className={styles.row} key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <input
                                        className={styles.cell}
                                        key={colIndex}
                                        value={cell}
                                        readOnly
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatrizInput;
