import { render, fireEvent } from '@testing-library/react';
import DataInnComponent from '../DataInnComponent';

test('DataInnComponent renderiza correctamente', () => {
  const { getByText } = render(<DataInnComponent initialMatriz={[['']]} />);
  const matrizOriginalTitle = getByText('Matriz Original:');
  expect(matrizOriginalTitle).toBeInTheDocument();
});

test('DataInnComponent se actyualiza la matriz mediante los cambios que se ghacen en los campos', () => {
  const { getByDisplayValue } = render(<DataInnComponent initialMatriz={[['']]} />);
  const input = getByDisplayValue('');
  fireEvent.change(input, { target: { value: '5' } });
  expect(input.value).toBe('5');
});

test('DataInnComponent rota la matriz anti horario', () => {
  const matrix = [['1', '2'], ['3', '4']];
  const { getByText, getByDisplayValue } = render(<DataInnComponent initialMatriz={matrix} />);

  // Verificar que la matriz original se renderiza correctamente
  const matrixOriginalTitle = getByText('Matriz Original:');
  expect(matrixOriginalTitle).toBeInTheDocument();
  const cell1 = getByDisplayValue('1');
  const cell2 = getByDisplayValue('2');
  const cell3 = getByDisplayValue('3');
  const cell4 = getByDisplayValue('4');
  expect(cell1).toBeInTheDocument();
  expect(cell2).toBeInTheDocument();
  expect(cell3).toBeInTheDocument();
  expect(cell4).toBeInTheDocument();

  // Rotar la matriz
  fireEvent.click(getByText('Rotar 90° Antihorario'));

  // Verificar que la matriz rotada se renderiza correctamente
  const matrixRotatedTitle = getByText('Matriz Original:');
  expect(matrixRotatedTitle).toBeInTheDocument();
  const rotatedCell1 = getByDisplayValue('2');
  const rotatedCell2 = getByDisplayValue('4');
  const rotatedCell3 = getByDisplayValue('1');
  const rotatedCell4 = getByDisplayValue('3');
  expect(rotatedCell1).toBeInTheDocument();
  expect(rotatedCell2).toBeInTheDocument();
  expect(rotatedCell3).toBeInTheDocument();
  expect(rotatedCell4).toBeInTheDocument();
});