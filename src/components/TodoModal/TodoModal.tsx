import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todoId: number;
  todos: Todo[];
  selectTodo: (value: number) => number | void;
};

export const TodoModal: React.FC<Props> = ({
  todoId,
  todos,
  selectTodo,
}) => {
  const [isCardOpen, setIsCardOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const currentTodo = todos.find(todo => todo.id === todoId);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(response => setUser(response));
    }
  }, []);

  if (!isCardOpen) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setIsCardOpen(false);
                selectTodo(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={currentTodo?.completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};