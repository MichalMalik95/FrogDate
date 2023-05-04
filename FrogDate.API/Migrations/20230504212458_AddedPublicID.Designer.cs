﻿// <auto-generated />
using System;
using FrogDate.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FrogDate.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230504212458_AddedPublicID")]
    partial class AddedPublicID
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.4");

            modelBuilder.Entity("FrogDate.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsMain")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("public_id")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("FrogDate.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Children")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DayOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Education")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("EyeColour")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Films")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FreeTime")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FriendsDescribeMe")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Growth")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("IFellsBestIn")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ILike")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Idisslike")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Intrests")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Languages")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("TEXT");

                    b.Property<string>("LookingFor")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("MakesMeLaught")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("MartialStatus")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Motto")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Music")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<string>("Personality")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Profession")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("SkinColour")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Sports")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ZodiacSign")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FrogDate.API.Models.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("FrogDate.API.Models.Photo", b =>
                {
                    b.HasOne("FrogDate.API.Models.User", "User")
                        .WithMany("Photos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("FrogDate.API.Models.User", b =>
                {
                    b.Navigation("Photos");
                });
#pragma warning restore 612, 618
        }
    }
}
