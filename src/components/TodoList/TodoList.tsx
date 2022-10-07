import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectTodo: (value: number) => number | void;
  selectedTodoId: number;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  selectedTodoId,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr
              data-cy="todo"
              className=""
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    return selectedTodoId === id
                      ? selectTodo(0)
                      : selectTodo(id);
                  }}
                >
                  <span className="icon">
                    {selectedTodoId === id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};