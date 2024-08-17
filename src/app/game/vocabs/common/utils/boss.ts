const defaultBosses = [
    {
        id: 1,
        type: "fire",
        imgSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzMS5wbmciLCJpYXQiOjE3MTM4NzYzNjMsImV4cCI6MTc0NTQxMjM2M30.-ONcRzZpJij1Gsn0njKWj8xBB5q7tXneNXr96zNK-tA&t=2024-04-23T12%3A46%3A04.868Z",
        imgUpSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss1up.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzMXVwLnBuZyIsImlhdCI6MTcxMzg3NjMyOSwiZXhwIjoxNzQ1NDEyMzI5fQ.7KU9rfffdOatqaJjsksmYSb9XpDLI7EKaG-pfK983T4&t=2024-04-23T12%3A45%3A30.054Z",
    },
    {
        id: 2,
        type: "grass",
        imgSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzMi5wbmciLCJpYXQiOjE3MTM4ODYwMjQsImV4cCI6MTc0NTQyMjAyNH0.AuT-UoQrfGwaBuiNXaUvWQDCr8EDFAoZM45zaF-GHO0&t=2024-04-23T15%3A27%3A04.720Z",
        imgUpSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss2up.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzMnVwLnBuZyIsImlhdCI6MTcxMzg4NjAzNiwiZXhwIjoxNzQ1NDIyMDM2fQ._lb0apT40sb9hvCobiEh_-tAYxmYYNEdhb6pajPXans&t=2024-04-23T15%3A27%3A17.015Z",
    },
    {
        id: 3,
        type: "water",
        imgSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzMy5wbmciLCJpYXQiOjE3MTYwOTQwMzgsImV4cCI6MTc0NzYzMDAzOH0.Ayr9Q3x0i3tpYZ6fXYciDYC5qia-S6mwt1vjlKZsC4k&t=2024-05-19T04%3A47%3A18.124Z",
        imgUpSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss3up.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzM3VwLnBuZyIsImlhdCI6MTcxMzg4NjM1NiwiZXhwIjoxNzQ1NDIyMzU2fQ.D7Gqujuzd-eUQP6T6w_ef66P73OkJ1gXDJRleW_5S9Y&t=2024-04-23T15%3A32%3A36.419Z",
    },
    {
        id: 4,
        type: "fire",
        imgSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzNC5wbmciLCJpYXQiOjE3MTM5Mzk3MDgsImV4cCI6MTc0NTQ3NTcwOH0.d3fTFC_rIgkgROrmRN3vwWhn7J1AjYPBvhnKlBezJ4g&t=2024-04-24T06%3A21%3A49.814Z",
        imgUpSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss4up.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzNHVwLnBuZyIsImlhdCI6MTcxMzkzOTcyMiwiZXhwIjoxNzQ1NDc1NzIyfQ.qdA08bdSsTUvsEfZq6BEnPfrqsbWGY4GRMYPoaLqnyY&t=2024-04-24T06%3A22%3A03.927Z",
    },
    {
        id: 5,
        type: "grass",
        imgSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzNS5wbmciLCJpYXQiOjE3MTM5Mzk4MTksImV4cCI6MTc0NTQ3NTgxOX0.qOKNZ1PB3nXTe3owEa4V_BS_nvKzuSpIzdbYZW5eFjI&t=2024-04-24T06%3A23%3A40.083Z",
        imgUpSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss5up.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzNXVwLnBuZyIsImlhdCI6MTcxMzkzOTgyNiwiZXhwIjoxNzQ1NDc1ODI2fQ.hCZ0i1HoyjYCu2qMTay89D_53e8qz73jqGziRHoP2dc&t=2024-04-24T06%3A23%3A47.047Z",
    },
    {
        id: 6,
        type: "water",
        imgSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss6.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzNi5wbmciLCJpYXQiOjE3MTM5Mzk4NzgsImV4cCI6MTc0NTQ3NTg3OH0.Xd1OzdZMfjFfnnEtYmQlOz2YTPrkSHZyNWAWGTE7Trw&t=2024-04-24T06%3A24%3A39.175Z",
        imgUpSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss6up.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzNnVwLnBuZyIsImlhdCI6MTcxMzkzOTg4NSwiZXhwIjoxNzQ1NDc1ODg1fQ.bDqhHLBh5LDYjzlBaHGHfyWr0e3s77cmcaLQR7cZlBQ&t=2024-04-24T06%3A24%3A46.337Z",
    },
    {
        id: 7,
        type: "fire",
        imgSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss7.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzNy5wbmciLCJpYXQiOjE3MTM5Mzk5NjQsImV4cCI6MTc0NTQ3NTk2NH0.IeVlD9emxbHU77QWnxcXaU64P6FZm5JsgFquEzxm6Pg&t=2024-04-24T06%3A26%3A05.697Z",
        imgUpSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss7up.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzN3VwLnBuZyIsImlhdCI6MTcxMzkzOTk3MiwiZXhwIjoxNzQ1NDc1OTcyfQ.r25t_GZJZ4JbU-u6CpN1IBK_DGNiZL44FncWl2Krye4&t=2024-04-24T06%3A26%3A13.092Z",
    },
    {
        id: 8,
        type: "grass",
        imgSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss8.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzOC5wbmciLCJpYXQiOjE3MTM5NDAwNzQsImV4cCI6MTc0NTQ3NjA3NH0.oSvxVLqc0Ze8LtaulhfoQ931IKWNuQIU1k0EZd3uurc&t=2024-04-24T06%3A27%3A55.368Z",
        imgUpSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss8up.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzOHVwLnBuZyIsImlhdCI6MTcxMzk0MDA4MSwiZXhwIjoxNzQ1NDc2MDgxfQ.G6qGqO_5_uqcSVgrImETP-A71_e7ll37xgrmmVcAJJA&t=2024-04-24T06%3A28%3A02.247Z",
    },
    {
        id: 9,
        type: "grass",
        imgSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss8.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzOC5wbmciLCJpYXQiOjE3MTM5NDAwNzQsImV4cCI6MTc0NTQ3NjA3NH0.oSvxVLqc0Ze8LtaulhfoQ931IKWNuQIU1k0EZd3uurc&t=2024-04-24T06%3A27%3A55.368Z",
        imgUpSrc: "https://bioaqexzzrwwrutpwikr.supabase.co/storage/v1/object/sign/images/boss/boss8up.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYm9zcy9ib3NzOHVwLnBuZyIsImlhdCI6MTcxMzk0MDA4MSwiZXhwIjoxNzQ1NDc2MDgxfQ.G6qGqO_5_uqcSVgrImETP-A71_e7ll37xgrmmVcAJJA&t=2024-04-24T06%3A28%3A02.247Z",
    },
];
export default defaultBosses;
