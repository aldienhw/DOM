const input = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    window.onload = function() {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.forEach(task => createTaskItem(task.text, task.completed));
    };

    function addTask() {
      const taskText = input.value.trim();
      if (taskText === "") {
        alert("Input cannot be empty!");
        return;
      }

      createTaskItem(taskText, false);
      saveTaskToStorage({ text: taskText, completed: false });
      input.value = "";
    }

    function createTaskItem(taskText, isCompleted) {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isCompleted;

      const span = document.createElement("span");
      span.textContent = taskText;
      if (isCompleted) {
        span.classList.add("completed");
      }

      checkbox.onchange = function () {
        span.classList.toggle("completed");
        updateTaskStatus(taskText, checkbox.checked);
      };

      const removeBtn = document.createElement("span");
      removeBtn.textContent = "❌";
      removeBtn.className = "remove-btn";
      removeBtn.onclick = function() {
        taskList.removeChild(li);
        removeTaskFromStorage(taskText);
      };

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(removeBtn);
      taskList.appendChild(li);
    }

    function saveTaskToStorage(taskObj) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(taskObj);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function removeTaskFromStorage(taskText) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(task => task.text !== taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateTaskStatus(taskText, isCompleted) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
        if (task.text === taskText) {
          task.completed = isCompleted;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }