<template>
  <div>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Історія записів</h3>
        </div>

        <div class="history-chart">
          <canvas></canvas>
        </div>

        <section>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Сума</th>
                <th>Дата</th>
                <th>Категорія</th>
                <th>Тип</th>
                <th>Відкрити</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>1212</td>
                <td>12.12.32</td>
                <td>name</td>
                <td>
                  <span class="white-text badge red">Витрати</span>
                </td>
                <td>
                  <button class="btn-small btn">
                    <i class="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>
