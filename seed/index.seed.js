const { client } = require("../lib/database.config.js");
const {
  createEventsTableQuery,
  importUidQuery,
} = require("../queries/event.queries.js");

async function seedEventsTable(events) {
  // await client.query(importUidQuery);
  await client.query(createEventsTableQuery);
  try {
    for (const event of events) {
      // Execute the seed query to insert event into the database
      await client.query({
        text: `INSERT INTO events (title, image, location, link, date, time, category) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING;`,
        values: [
          event.title,
          event.image,
          event.location,
          event.link,
          event.date,
          event.time,
          event.category,
        ],
      });
    }
    console.log("Events inserted into database");
  } catch (err) {
    console.error("Error inserting events into database:", err);
  }
}
const seedOffersTable = {
  text: `INSERT INTO offers (event_id, details, seat_number, seat_area, price, seller_uid, status, customer_uid, quantity) VALUES
    (1, 'Front row tickets for the concert', 'A12', 'South', 100, 1, 'open', null, 2),
    (2, 'VIP backstage pass for the festival', 'C2', 'North', 200, 2, 'closed', 1, 0),
    (3, 'Exclusive dinner with the artist', 'B10', 'West', 300, 3, 'open', null, 1);
  `,
};

const seedUsersTable = {
  text: `INSERT INTO users (full_name, phone, gender, is_verified, personal_id, tickets_sold, is_reliable_seller, bio, email, image) VALUES
('John Doe', '+1234567890', 'Male', true, '1234567890', 10, true, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero nec odio vehicula semper eget sed nisi.', 'john.doe@gmail.com', 'https://g.foolcdn.com/editorial/images/454506/smiling-man-in-suit_gettyimages-509102308.jpg'),
('Nikola Peric', '+987654321', 'Male', false, '0987654321', 5, false, 'Nulla nec metus scelerisque, gravida nulla id, suscipit odio. Nullam auctor malesuada efficitur.', 'nikola.peric@gmail.com', 'https://th.bing.com/th/id/OIP.7i2b664G--ip-h1Yk8K84AHaEo?rs=1&pid=ImgDetMain'),
('Mika Mikic', '+1122334455', 'Female', true, '1122334455', 20, true, 'Pellentesque pretium ex quis orci interdum, sed suscipit arcu dictum. Vestibulum tempus efficitur ligula, nec convallis ligula posuere quis.', 'mika.mikic@gmail.com', 'https://th.bing.com/th/id/OIP.0oIkdrUxUHovwpTx2KFuyAAAAA?rs=1&pid=ImgDetMain') ON CONFLICT DO NOTHING;`,
};

module.exports = {
  seedEventsTable,
  seedEventsTable,
  seedUsersTable,
  seedOffersTable,
};


