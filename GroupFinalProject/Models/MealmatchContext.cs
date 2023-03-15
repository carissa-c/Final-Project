﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GroupFinalProject.Models;

public partial class MealmatchContext : DbContext
{
    public MealmatchContext()
    {
    }

    public MealmatchContext(DbContextOptions<MealmatchContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Recipe> Recipes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=mealmatch.database.windows.net;Initial Catalog=Mealmatch; User Id=groupproject; Password=GrandMeals123");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Recipe__3214EC07137EE07C");

            entity.ToTable("Recipe");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
